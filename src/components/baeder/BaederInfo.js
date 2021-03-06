import React from 'react';
import PropTypes from 'prop-types';
import InfoBox from '../commons/InfoBox';
import { getColorForProperties } from '../../utils/baederHelper';
import { triggerLightBoxForPOI } from '../../utils/stadtplanHelper';
import { Well } from 'react-bootstrap';
import { Icon } from 'react-fa';
import IconLink from '../commons/IconLink';
import CollapsibleWell from '../commons/CollapsibleWell';

/* eslint-disable jsx-a11y/anchor-is-valid */

// Since this component is simple and static, there's no parent container for it.
const BaederInfo = ({
	featureCollection,
	items,
	selectedIndex,
	next,
	previous,
	fitAll,
	loadingIndicator,
	showModalMenu,
	uiState,
	uiStateActions,
	linksAndActions,
	panelClick,
	pixelwidth,
	minified,
	minify
}) => {
	const currentFeature = featureCollection[selectedIndex];

	let header, links, adresse, info, fotoPreview, headerColor, title;
	if (items && items.length === 0) {
		return null;
	}

	if (currentFeature) {
		header = `${currentFeature.properties.more.typ} (${currentFeature.properties.more
			.betreiber}), ${currentFeature.properties.more.zugang}`;

		adresse = currentFeature.properties.adresse;

		if (currentFeature.properties.stadt !== 'Wuppertal') {
			adresse += ', ' + currentFeature.properties.stadt;
		}

		info = '';
		if (currentFeature.properties.info) {
			info = currentFeature.properties.info;
		}
		links = [];
		if (currentFeature.properties.tel) {
			links.push(
				<IconLink
					key={`IconLink.tel`}
					tooltip='Anrufen'
					href={'tel:' + currentFeature.properties.tel}
					iconname='phone'
				/>
			);
		}
		if (currentFeature.properties.email) {
			links.push(
				<IconLink
					key={`IconLink.email`}
					tooltip='E-Mail schreiben'
					href={'mailto:' + currentFeature.properties.email}
					iconname='envelope-square'
				/>
			);
		}
		if (currentFeature.properties.url) {
			links.push(
				<IconLink
					key={`IconLink.web`}
					tooltip='Zur Homepage'
					href={currentFeature.properties.url}
					target='_blank'
					iconname='external-link-square'
				/>
			);
		}
		if (currentFeature.properties.more.coursemanager) {
			links.push(
				<IconLink
					key={`IconLink.coursemanager`}
					tooltip='Kurs buchen'
					href={currentFeature.properties.more.coursemanager}
					target='coursemanager'
					iconname='calendar'
				/>
			);
		}

		if (currentFeature.properties.foto) {
			fotoPreview = (
				<table style={{ width: '100%' }}>
					<tbody>
						<tr>
							<td style={{ textAlign: 'right', verticalAlign: 'top' }}>
								<a
									onClick={() => {
										triggerLightBoxForPOI(currentFeature, uiStateActions);
									}}
									hrefx={
										currentFeature.properties.fotostrecke ||
										currentFeature.properties.foto
									}
									target='_fotos'
								>
									<img
										alt='Bild'
										style={{ paddingBottom: '5px' }}
										src={currentFeature.properties.foto.replace(
											/http:\/\/.*fotokraemer-wuppertal\.de/,
											'https://wunda-geoportal-fotos.cismet.de/'
										)}
										width='150'
									/>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			);
		}

		headerColor = getColorForProperties(currentFeature.properties);
		title = currentFeature.text;
	}
	return (
		<InfoBox
			isCollapsible={currentFeature !== undefined}
			featureCollection={featureCollection}
			items={items}
			selectedIndex={selectedIndex}
			next={next}
			previous={previous}
			fitAll={fitAll}
			loadingIndicator={loadingIndicator}
			showModalMenu={showModalMenu}
			uiState={uiState}
			uiStateActions={uiStateActions}
			linksAndActions={linksAndActions}
			panelClick={panelClick}
			colorize={getColorForProperties}
			pixelwidth={pixelwidth}
			header={header}
			headerColor={headerColor}
			links={links}
			title={title}
			subtitle={adresse}
			additionalInfo={info}
			zoomToAllLabel={`${items.length} Bäder in Wuppertal`}
			currentlyShownCountLabel={`${featureCollection.length} ${featureCollection.length === 1
				? 'Bad'
				: 'Bäder'} angezeigt`}
			fotoPreview={fotoPreview}
			collapsedInfoBox={minified}
			setCollapsedInfoBox={minify}
			noCurrentFeatureTitle={<h5>Keine Bäder gefunden!</h5>}
			noCurrentFeatureContent={
				<div style={{ marginRight: 9 }}>
					<p>
						Für mehr Bäder Ansicht mit <Icon name='minus-square' /> verkleinern oder mit
						dem untenstehenden Link auf das komplette Stadtgebiet zoomen.
					</p>
					<div align='center'>
						<a onClick={fitAll}>{items.length} Bäder in Wuppertal</a>
					</div>
				</div>
			}
		/>
	);
};

export default BaederInfo;
BaederInfo.propTypes = {
	featureCollection: PropTypes.array.isRequired,
	filteredPOIs: PropTypes.array.isRequired,
	selectedIndex: PropTypes.number.isRequired,
	next: PropTypes.func.isRequired,
	previous: PropTypes.func.isRequired,
	fitAll: PropTypes.func.isRequired,
	showModalMenu: PropTypes.func.isRequired,
	panelClick: PropTypes.func.isRequired
};

BaederInfo.defaultProps = {
	featureCollection: [],
	filteredPOIs: [],
	selectedIndex: 0,
	next: () => {},
	previous: () => {},
	fitAll: () => {},
	showModalMenu: () => {}
};
