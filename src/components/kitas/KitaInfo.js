import React from 'react';
import PropTypes from 'prop-types';
import { Well } from 'react-bootstrap';
import { Icon } from 'react-fa';
import {
	getColorForProperties,
	getAgeString,
	getHoursString,
	getDescription
} from '../../utils/kitasHelper';
import Color from 'color';
import CollapsibleWell from '../commons/CollapsibleWell';
import InfoBox from '../commons/InfoBox';

/* eslint-disable jsx-a11y/anchor-is-valid */

// Since this component is simple and static, there's no parent container for it.
const KitaInfo = ({
	featureCollection,
	filteredKitas,
	selectedIndex,
	next,
	previous,
	fitAll,
	loadingIndicator,
	showModalMenu,
	uiState,
	uiStateActions,
	panelClick,
	featureRendering,
	minified,
	minify,
	pixelwidth
}) => {
	if (filteredKitas && filteredKitas.length === 0) {
		return null;
	}

	const currentFeature = featureCollection[selectedIndex];

	let urllink = null;
	let phonelink = null;
	let links = [];
	let headerText, title, adresse, poiColor, alter, stunden, description;

	let collapsible;
	if (currentFeature) {
		headerText = 'Kita';
		collapsible = true;
		if (currentFeature.properties.url) {
			links.push(
				<a
					title='Zur Homepage'
					key={'kitas.url.action.'}
					href={currentFeature.properties.url}
					target='_blank'
				>
					<Icon
						style={{ color: 'grey', width: '26px', textAlign: 'center' }}
						size='2x'
						name={'external-link-square'}
					/>
				</a>
			);
		}
		if (currentFeature.properties.tel) {
			links.push(
				<a
					title='Anrufen'
					key={'kitas.phone.action.'}
					href={'tel:' + currentFeature.properties.tel}
				>
					<Icon
						style={{ color: 'grey', width: '26px', textAlign: 'center' }}
						size='2x'
						name={'phone'}
					/>
				</a>
			);
		}

		poiColor = Color(getColorForProperties(currentFeature.properties, featureRendering));
		if (currentFeature.properties.adresse) {
			adresse = ', ' + currentFeature.properties.adresse;
		} else {
			adresse = '';
		}
		title = currentFeature.properties.name + adresse;
		let category;
		if (currentFeature.properties.plaetze_fuer_behinderte === true) {
			category = 'Kita mit Schwerpunkt Inklusion';
		} else {
			category = 'Kita';
		}

		description = getDescription(currentFeature.properties);
		alter = getAgeString(currentFeature.properties);

		stunden = getHoursString(currentFeature.properties);
	} else {
		collapsible = false;
	}
	return (
		<InfoBox
			isCollapsible={collapsible}
			featureCollection={featureCollection}
			items={filteredKitas}
			selectedIndex={selectedIndex}
			next={next}
			previous={previous}
			fitAll={fitAll}
			loadingIndicator={loadingIndicator}
			showModalMenu={showModalMenu}
			uiState={uiState}
			uiStateActions={uiStateActions}
			linksAndActions={links}
			panelClick={panelClick}
			colorize={getColorForProperties}
			pixelwidth={pixelwidth}
			header={headerText}
			headerColor={poiColor}
			links={links}
			title={title}
			subtitle={
				<p>
					<Icon
						style={{
							color: 'grey',
							width: '30px',
							textAlign: 'center'
						}}
						size='2x'
						name={'user'}
					/>
					{alter}
					<Icon
						style={{
							color: 'grey',
							width: '40px',
							textAlign: 'center'
						}}
						size='2x'
						name={'calendar'}
					/>
					{stunden}
				</p>
			}
			additionalInfo={description}
			zoomToAllLabel={`${filteredKitas.length} ${filteredKitas.length === 1
				? 'Kita'
				: 'Kitas'} in Wuppertal`}
			currentlyShownCountLabel={`${featureCollection.length} ${featureCollection.length === 1
				? 'Kita'
				: 'Kitas'} angezeigt`}
			fotoPreview={undefined}
			collapsedInfoBox={minified}
			setCollapsedInfoBox={minify}
			noCurrentFeatureTitle={<h5>Keine Kitas gefunden!</h5>}
			noCurrentFeatureContent={
				<div>
					<p>
						Für mehr Kitas Ansicht mit <Icon name='minus-square' /> verkleinern. Um nach
						Themenfeldern zu filtern, das
						<a onClick={() => showModalMenu('filter')}>
							{' '}
							Men&uuml;&nbsp;
							<Icon
								name='bars'
								style={{
									color: 'black'
								}}
							/>{' '}
							&ouml;ffnen.
						</a>
					</p>
					<div align='center'>
						<a onClick={fitAll}>{filteredKitas.length + ' '}Kitas in Wuppertal</a>
					</div>
				</div>
			}
		/>
	);
};

export default KitaInfo;
KitaInfo.propTypes = {
	featureCollection: PropTypes.array.isRequired,
	filteredKitas: PropTypes.array.isRequired,
	selectedIndex: PropTypes.number.isRequired,
	next: PropTypes.func.isRequired,
	previous: PropTypes.func.isRequired,
	fitAll: PropTypes.func.isRequired,
	showModalMenu: PropTypes.func.isRequired,
	panelClick: PropTypes.func.isRequired
};

KitaInfo.defaultProps = {
	featureCollection: [],
	filteredKitas: [],
	selectedIndex: 0,
	next: () => {},
	previous: () => {},
	fitAll: () => {},
	showModalMenu: () => {}
};
