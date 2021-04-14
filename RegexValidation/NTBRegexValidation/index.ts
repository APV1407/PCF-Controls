import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class RegExValidationControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>;
	private eventHandler: EventListenerOrEventListenerObject;
	private _container: HTMLDivElement;
	private objInputElement: HTMLInputElement;
	private sInputValue: string;
	private objRegex: RegExp;
	private userNotificationText: string;
	public sDefaultLabel = "";
	public sDefaultErrorLabel = "Incorrect Format";
	public sDivElementClass: string = "classDiv";
	public sDivElementId: string = "sDivId";
	public sInputElementClass: string = "classInput";
	public sInputElementId: string = "sInputId";
	public sLabelElementClass: string = "classLabel";
	public sLabelElementId: string = "sLabelId";
	public sErrorLabelElementClass: string = "classErrorLabel";
	public sErrorLabelElementId: string = "sErrorLabelId";

	/**Empty constructor */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param objActualContainer If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, 
	state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		var sInputValue = "";

		this._context = context;
		this._notifyOutputChanged = notifyOutputChanged;
		this.eventHandler = this.onTextInput.bind(this);
		this._container = document.createElement("div");

		this.objInputElement = document.createElement("input");
		this.objInputElement.setAttribute("type", "text");
		this.objInputElement.setAttribute("id", this.sInputElementId);
		this.objInputElement.setAttribute("class", this.sInputElementClass);
		this.objInputElement.addEventListener("input", this.eventHandler);

		if(!this.isNullOrUndefined(context.parameters.ValueToProcess))
		{
			this.sInputValue = context.parameters.ValueToProcess.raw||"";
			sInputValue = context.parameters.ValueToProcess.formatted ?
				context.parameters.ValueToProcess.formatted : "";
		}
		
		if(!this.isNullOrUndefined(context.parameters.RegexExpression))
		{
			this.objRegex = new RegExp(context.parameters.RegexExpression.raw||"");
		}
		
		if(!this.isNullOrUndefined(context.parameters.UserNotificationText))
		{
			this.userNotificationText = context.parameters.UserNotificationText.raw||"";
		}

		this.objInputElement.setAttribute("value", sInputValue);
		this._container.appendChild(this.objInputElement);
		container.appendChild(this._container);
	}

	/**
	 * Called when any value in the property bag has changed. 
	 * This includes field values, data-sets, global values such as container height and width, 
	 * offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; 
	 * It contains values as set up by the customizer mapped to names defined in the manifest, 
	 * as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._context = context;
	}

	/**
	 * Called when any value change occurs in Input Element TextBox
	 * @param objEvent
	 */
	public onTextInput(objEvent: Event): void
	{
		this.sInputValue = (this.objInputElement.value as any) as string;
		this.validateInputUsingRegex(this.sInputValue);
		this._notifyOutputChanged();
	}

	public validateInputUsingRegex(sValueToProcess: string): void
	{		
		var sNotification = (!this.isNullOrUndefined(this.userNotificationText)) ?
			this.userNotificationText : this.sDefaultErrorLabel;
		var sUniqueId = sNotification + "_UniqueId";

		var clearNotification = null;
		var setNotification = null;
		
		clearNotification = this.GetFunctionFromContextUtils("clearNotification");
		setNotification = this.GetFunctionFromContextUtils("setNotification");		
		if(!this.isNullOrUndefined(clearNotification) && !this.isNullOrUndefined(setNotification))
		{
			clearNotification = clearNotification as Function;
			setNotification = setNotification as Function;
			if(!this.isNullOrUndefined(this.objRegex) && !this.isNullOrUndefined(sValueToProcess) &&
			  !this.objRegex.test(sValueToProcess))
			{
				setNotification(sNotification, sUniqueId);
			}
			else
			{
				clearNotification(sUniqueId);
			}
		}
	}

	public GetFunctionFromContextUtils(sFunctionName: string): Function | null
	{
		var objFunctionToReturn = null;
		
		if(!this.isNullOrUndefined(this._context) && !this.isNullOrUndefined(this._context.utils) &&
		   !this.isNullOrUndefined((this._context.utils as any)[sFunctionName]))
		{
			objFunctionToReturn = (this._context.utils as any)[sFunctionName] as Function;
		}
		
		return objFunctionToReturn;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, 
	 * expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return { ValueToProcess: this.sInputValue };
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. 
	 * Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		this.objInputElement.removeEventListener("input", this.eventHandler);
	}

	public isNullOrUndefined(objectToProcess: any): boolean
	{
		var bIsNull: boolean = false;
		if(objectToProcess === null && objectToProcess === "" &&
			objectToProcess !== undefined && objectToProcess === "undefined")
		{
			bIsNull = true;
		}
		return bIsNull;
	}
}