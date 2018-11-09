import objectAssign from 'object-assign';

//TYPES
export const types = {
	SET_SIMULATION: 'STARKREGEN/SET_SIMULATION',
	SET_SELECTED_BACKGROUND: 'STARKREGEN/SET_SELECTED_BACKGROUND',
	SET_BACKGROUND_LAYER: 'STARKREGEN/SET_BACKGROUND_LAYER',
	SET_MINIFIED_INFO_BOX: 'STARKREGEN/SET_MINIFIED_INFO_BOX',
	SET_FEATUREINFOMODE_ACTIVATION: 'STARKREGEN/SET_FEATUREINFOMODE_ACTIVATION',
	SET_FEATUREOINFO_VALUE: 'STARKREGEN/SET_FEATUREOINFO_VALUE',
	SET_FEATUREOINFO_POSITION: 'STARKREGEN/SET_FEATUREOINFO_POSITION'
};

export const constants = {};

///INITIAL STATE
export const initialState = {
	featureInfoModeActivated: true,
	currentFeatureInfoValue: undefined,
	currentFeatureInfoPosition: undefined,
	minifiedInfoBox: false,
	selectedSimulation: 0,
	backgroundLayer: undefined,
	selectedBackground: 0,
	simulations: [
		{
			layer: 'R102:20md',
			name: '20-jährlich',
			title: '20-jährlicher Starkregen (2h)',
			icon: 'bar-chart',
			subtitle:
				'Simulation eines zweistündigen Starkregens mit statistisch 20-jährlicher Wiederkehrzeit in ganz Wuppertal (Intensitätsverlauf Modell Euler Typ II)'
		},
		{
			layer: 'R102:100md',
			name: '100-jährlich',
			icon: 'bar-chart',
			title: '100-jährlicher Starkregen (2h)',
			subtitle:
				'Simulation eines zweistündigen Starkregens mit statistisch 100-jährlicher Wiederkehrzeit in ganz Wuppertal (Intensitätsverlauf Modell Euler Typ II)'
		},
		{
			layer: 'R102:90md',
			name: '90 Liter/m²',
			icon: 'bitbucket',
			title: '90 Liter/m² Blockregen (1h)',
			subtitle:
				'Simulation eines einstündigen Starkregens (90 Liter pro m²) mit gleichmäßiger Intensität ("Blockregen") in ganz Wuppertal '
		},
		{
			layer: 'R102:SRmd',
			name: '29.05.18',
			icon: 'calendar',
			title: 'Starkregen vom 29.05.2018',
			subtitle:
				'Simulation des Starkregens vom 29.05.2018 in den Tallagen von Barmen und Elberfeld anhand gemessener Niederschlagsmengen'
		}
	],
	backgrounds: [
		{ layerkey: 'wupp-plan-live@40', src: '/images/rain-hazard-map-bg/citymap.png', title: 'Stadtplan' },
		{ layerkey: 'trueOrtho2018@40', src: '/images/rain-hazard-map-bg/ortho.png', title: 'Luftbild' },
		{
			layerkey: 'wupp-plan-live@60|trueOrtho2018@40',
			src: '/images/rain-hazard-map-bg/mixed.png',
			title: 'Luftbild mit Beschriftungen'
		}
	],
	legend: [
		{ title: '> 10 cm', lt: 0.1, bg: '#AFCFF9' },
		{ title: '> 30 cm', lt: 0.3, bg: '#FED27B' },
		{ title: '> 50 cm', lt: 0.4, bg: '#E9B279' },
		{ title: '> 100 cm', lt: 1.0, bg: '#DD8C7B' }
	]
};
///REDUCER
export default function starkregenReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case types.SET_SIMULATION: {
			newState = objectAssign({}, state);
			newState.selectedSimulation = action.simulation;
			return newState;
		}
		case types.SET_SELECTED_BACKGROUND: {
			newState = objectAssign({}, state);
			newState.selectedBackground = action.backgroundIndex;
			return newState;
		}
		case types.SET_BACKGROUND_LAYER: {
			newState = objectAssign({}, state);
			newState.backgroundLayer = action.layer;
			return newState;
		}
		case types.SET_MINIFIED_INFO_BOX: {
			newState = objectAssign({}, state);
			newState.minifiedInfoBox = action.minified;
			return newState;
		}
		case types.SET_FEATUREINFOMODE_ACTIVATION: {
			newState = objectAssign({}, state);
			newState.featureInfoModeActivated = action.activated;
			return newState;
		}
		case types.SET_FEATUREOINFO_VALUE: {
			newState = objectAssign({}, state);
			newState.currentFeatureInfoValue = action.value;
			return newState;
		}
		case types.SET_FEATUREOINFO_POSITION: {
			newState = objectAssign({}, state);
			newState.currentFeatureInfoPosition = action.position;
			return newState;
		}
		default:
			return state;
	}
}

///SIMPLEACTIONCREATORS
function setSimulation(simulation) {
	return { type: types.SET_SIMULATION, simulation };
}
function setSelectedBackground(backgroundIndex) {
	return { type: types.SET_SELECTED_BACKGROUND, backgroundIndex };
}
function setBackgroundLayer(layers) {
	return { type: types.SET_BACKGROUND_LAYER, layers };
}
function setMinifiedInfoBox(minified) {
	return { type: types.SET_MINIFIED_INFO_BOX, minified };
}
function setFeatureInfoModeActivation(activated) {
	return { type: types.SET_FEATUREINFOMODE_ACTIVATION, activated };
}
function setCurrentFeatureInfoValue(value) {
	return { type: types.SET_FEATUREOINFO_VALUE, value };
}
function setCurrentFeatureInfoPosition(position) {
	return { type: types.SET_FEATUREOINFO_POSITION, position };
}
//COMPLEXACTIONS

//EXPORT ACTIONS
export const actions = {
	setSimulation,
	setSelectedBackground,
	setBackgroundLayer,
	setMinifiedInfoBox,
	setFeatureInfoModeActivation,
	setCurrentFeatureInfoValue,
	setCurrentFeatureInfoPosition
};

//HELPER FUNCTIONS