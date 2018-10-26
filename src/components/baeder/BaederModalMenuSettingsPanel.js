import React from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';

import GenericModalMenuSection from '../commons/GenericModalMenuSection';
import SymbolSizeChooser from '../commons/SymbolSizeChooser';
import NamedMapStyleChooser from '../commons/NamedMapStyleChooser';
import SettingsPanelWithPreviewSection from '../commons/SettingsPanelWithPreviewSection';
import { getInternetExplorerVersion } from '../../utils/browserHelper';
import 'url-search-params-polyfill';
import { getColorForProperties, getBadSVG } from '../../utils/baederHelper';
import { MappingConstants, FeatureCollectionDisplay, getLayersByName } from 'react-cismap';

import { Map } from 'react-leaflet';
import previewFeatureCollection from './BaederPreviewFeatureCollection';

import { getFeatureStyler } from '../../utils/stadtplanHelper';

const BaederModalMenuSettingsSection = ({
	uiState,
	uiStateActions,
	width,
	urlPathname,
	urlSearch,
	pushNewRoute,
	changeMarkerSymbolSize,
	currentMarkerSize,
	topicMapRef
}) => {
	let namedMapStyle = new URLSearchParams(urlSearch).get('mapStyle') || 'default';
	let zoom = 7;
	let layers = '';
	if (topicMapRef) {
		layers = topicMapRef.wrappedInstance.props.backgroundlayers;
	}
	const mapPreview = (
		<Map
			ref={(leafletMap) => {
				this.leafletMap = leafletMap;
			}}
			crs={MappingConstants.crs25832}
			style={{ height: 300 }}
			center={{
				lat: 51.26357182763206,
				lng: 7.176242149341344
			}}
			zoomControl={false}
			attributionControl={false}
			dragging={false}
			keyboard={false}
			zoom={zoom}
			minZoom={zoom}
			maxZoom={zoom}
		>
			{getLayersByName(layers, namedMapStyle)}
			<FeatureCollectionDisplay
				key={
					'FeatureCollectionDisplayPreview.' + currentMarkerSize
					// +
					//   this.props.featureKeySuffixCreator() +
					//   "clustered:" +
					//   this.props.clustered +
					//   ".customPostfix:" +
					//   this.props.featureCollectionKeyPostfix
				}
				featureCollection={previewFeatureCollection}
				clusteringEnabled={false}
				style={getFeatureStyler(currentMarkerSize, getColorForProperties)}
				featureStylerScalableImageSize={currentMarkerSize}
				mapRef={this.leafletMap}
				showMarkerCollection={false}
			/>
		</Map>
	);
	const preview = (
		<div>
			<FormGroup>
				<ControlLabel>Vorschau:</ControlLabel>
				<br />
				{/* <div
					style={{
						backgroundImage:
							"url('/images/map.preview.default" +
							".png')",
						width: '100%',
						height: '250px',
						filter: filter,
						backgroundPosition: 'center'
					}}
				>
				</div> */}
				{mapPreview}
			</FormGroup>
		</div>
	);

	return (
		<GenericModalMenuSection
			uiState={uiState}
			uiStateActions={uiStateActions}
			sectionKey="settings"
			sectionTitle="Einstellungen"
			sectionBsStyle="primary"
			sectionContent={
				<SettingsPanelWithPreviewSection
					width={width}
					preview={preview}
					settingsSections={[
						getInternetExplorerVersion() === -1 && (
							<NamedMapStyleChooser
								currentNamedMapStyle={namedMapStyle}
								pathname={urlPathname}
								search={urlSearch}
								pushNewRoute={pushNewRoute}
								modes={[ { title: 'mehrfarbig', mode: 'default' }, { title: 'blau', mode: 'blue' } ]}
							/>
						),
						<SymbolSizeChooser
							changeMarkerSymbolSize={changeMarkerSymbolSize}
							currentMarkerSize={currentMarkerSize}
							getSymbolSVG={getBadSVG}
							symbolColor={getColorForProperties({
								more: { zugang: 'öffentlich', betreiber: 'Verein' }
							})}
						/>
					]}
				/>
			}
		/>
	);
};

export default BaederModalMenuSettingsSection;
