import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Well, Tooltip } from 'react-bootstrap';
import Loadable from 'react-loading-overlay';
import { Icon } from 'react-fa';
/* eslint-disable jsx-a11y/anchor-is-valid */

// Since this component is simple and static, there's no parent container for it.
const BPlanInfo = ({
	featureCollection,
	selectedIndex,
	next,
	previous,
	fitAll,
	loadingIndicator,
	loadingError,
	downloadPlan,
	downloadEverything,
	preparedDownload,
	resetPreparedDownload
}) => {
	const currentFeature = featureCollection[selectedIndex];

	let logCurrentFeature = function() {
		//console.log(JSON.stringify(currentFeature));
	};

	let planOrPlaene;
	let planOrPlanteile_rk;
	let planOrPlanteile_nrk;
	let dokumentArt = '';

	if (
		currentFeature.properties.plaene_rk.length + currentFeature.properties.plaene_nrk.length >
		1
	) {
		planOrPlaene = 'Pläne';
		dokumentArt = 'PDF Dokumente';
	} else {
		planOrPlaene = 'Plan';
		dokumentArt = 'PDF Dokument';
	}

	if (
		currentFeature.properties.plaene_rk.length > 1 ||
		currentFeature.properties.plaene_rk.length === 0
	) {
		planOrPlanteile_rk = 'rechtskräftigen Planteilen';
	} else {
		planOrPlanteile_rk = 'rechtskräftigem Plan';
	}
	if (
		currentFeature.properties.plaene_nrk.length > 1 ||
		currentFeature.properties.plaene_nrk.length === 0
	) {
		planOrPlanteile_nrk = 'nicht rechtskräftigen Planteilen';
	} else {
		planOrPlanteile_nrk = 'nicht rechtskräftigem Plan';
	}

	let nichtRK = '';
	if (currentFeature.properties.plaene_nrk.length > 0) {
		nichtRK = ' und ' + currentFeature.properties.plaene_nrk.length + ' ' + planOrPlanteile_nrk;
	}

	let docsEnabled;
	let docOrDocs;
	if (currentFeature.properties.docs.length === 0) {
		docsEnabled = false;
		docOrDocs = 'Dokumente';
	} else if (currentFeature.properties.docs.length > 0) {
		docsEnabled = true;
		docOrDocs = 'Zusatzdokumenten';
	} else {
		docsEnabled = true;
		docOrDocs = 'Zusatzdokument';
	}

	let zusatzdokumente = '';
	if (currentFeature.properties.docs.length > 0) {
		zusatzdokumente = ' und ' + currentFeature.properties.docs.length + ' ' + docOrDocs;
	}

	const planTooltip = (
		<Tooltip style={{ zIndex: 3000000000 }} id='planTooltip'>
			{dokumentArt} mit{' '}
			{currentFeature.properties.plaene_rk.length +
				' ' +
				planOrPlanteile_rk +
				nichtRK +
				zusatzdokumente}
		</Tooltip>
	);

	const docsTooltip = (
		<Tooltip style={{ zIndex: 3000000000 }} id='docsTooltip'>
			ZIP Archiv mit allen Plänen und{' '}
			{currentFeature.properties.docs.length + ' ' + docOrDocs}
		</Tooltip>
	);

	let docDownload = null;
	if (docsEnabled) {
		docDownload = (
			<h6>
				<OverlayTrigger placement='left' overlay={docsTooltip}>
					<a onClick={downloadEverything}>alles</a>
				</OverlayTrigger>
			</h6>
		);
	} else {
		docDownload = <h6>&nbsp;</h6>;
	}

	let statusGlyphs = null;
	let status = currentFeature.properties.status;
	//let rk=(<FontAwesome name='check-circle-o' />);
	let rktt = (
		<Tooltip style={{ zIndex: 3000000000 }} id='rktt'>
			rechtswirksam
		</Tooltip>
	);
	let nrktt = (
		<Tooltip style={{ zIndex: 3000000000 }} id='nrktt'>
			laufendes Verfahren
		</Tooltip>
	);

	let rk = (
		<OverlayTrigger placement='top' overlay={rktt}>
			<Icon style={{ color: 'green', opacity: 0.5 }} name='check-circle-o' />
		</OverlayTrigger>
	);
	let nrk = (
		<OverlayTrigger placement='top' overlay={nrktt}>
			<Icon style={{ color: 'red', opacity: 0.5 }} name='times-circle-o' />
		</OverlayTrigger>
	);
	if (status === 'rechtskräftig') {
		statusGlyphs = (
			<span>
				&nbsp;
				{rk}
			</span>
		);
	} else if (status === 'nicht rechtskräftig') {
		statusGlyphs = (
			<span>
				&nbsp;
				{nrk}
			</span>
		);
	} else {
		statusGlyphs = (
			<span>
				&nbsp;
				{rk}
				&nbsp;
				{nrk}
			</span>
		);
	}

	let downloaderOverlay = <div />;
	if (preparedDownload) {
		downloaderOverlay = (
			<div
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					height: '100%',
					verticalAlign: 'center',
					width: '100%',
					position: 'absolute',
					zIndex: 999,
					top: 0,
					left: 0
				}}
			>
				<div
					style={{
						paddingTop: 5,
						color: 'rgba(255, 255, 255, 0.8)',
						textAlign: 'center',
						verticalAlign: 'center'
					}}
				/>
				<div style={{ position: 'absolute', top: 5, right: 5 }}>
					{' '}
					<a
						onClick={() => resetPreparedDownload()}
						style={{ color: 'rgba(255, 255, 255, 0.8)' }}
					>
						<Icon name='close' />
					</a>
				</div>
				<a
					style={{
						textAlign: 'center',
						verticalAlign: 'center',
						height: '100%',
						width: '100%'
					}}
					onClick={() => {
						//downloadSingleFile(preparedDownload);
						resetPreparedDownload();
					}}
					href={preparedDownload.url}
					download={preparedDownload.file}
					target='_blank'
				>
					<h1>
						<Icon name='arrow-circle-o-down' />
						<Icon name='check' />
					</h1>
				</a>

				<div
					style={{
						color: 'rgba(255, 255, 255, 0.8)',
						textAlign: 'center',
						height: '100%',
						width: '100%'
					}}
				>
					<p style={{ paddingLeft: '8px', paddingRight: '8px', paddingBottom: '4px' }}>
						Die Zusammenstellung Ihrer Dokumente kann jetzt abgeholt werden. Dazu
						einfach auf das Downloadsymbol klicken oder alternativ den Prozess mit{' '}
						<Icon name='close' /> abbrechen.
					</p>
				</div>
			</div>
		);
	}
	let LoadableBackground = 'rgba(0, 0, 0, 0.7)';
	let loadableText = 'Zusammenstellen der Dokumente ...';
	let loadableSpinner = true;
	if (loadingError === true) {
		LoadableBackground = 'rgba(164, 10, 0, 0.7)';
		loadableText = 'Fehler beim Laden';
		loadableSpinner = false;
	}
	return (
		<Loadable
			active={loadingIndicator}
			spinner={loadableSpinner}
			text={loadableText}
			background={LoadableBackground}
		>
			<Well bsSize='small' onClick={logCurrentFeature}>
				<div>
					<table border={0} style={{ width: '100%' }}>
						<tbody>
							<tr>
								<td
									style={{
										textAlign: 'left',
										verticalAlign: 'top',
										padding: '5px',
										maxWidth: '160px',
										overflowWrap: 'break-word'
									}}
								>
									<h4>
										BPlan {currentFeature.properties.nummer}
										{statusGlyphs}
									</h4>
									<h6>{currentFeature.properties.name}</h6>
								</td>
								<td
									style={{
										textAlign: 'center',
										verticalAlign: 'top',
										padding: '5px',
										paddingTop: '1px'
									}}
								>
									<a style={{ color: '#333' }} onClick={downloadPlan}>
										<h4 style={{ marginLeft: 5, marginRight: 5 }}>
											<font size='30'>
												<Icon
													style={{ textDecoration: 'none' }}
													name='file-pdf-o'
												/>
											</font>
										</h4>
										<OverlayTrigger placement='left' overlay={planTooltip}>
											<div>Dokumente</div>
										</OverlayTrigger>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<br />
					<table style={{ width: '100%' }}>
						<tbody>
							<tr>
								<td style={{ textAlign: 'left', verticalAlign: 'center' }}>
									<a title='vorheriger Treffer' onClick={previous}>
										&lt;&lt;
									</a>
								</td>

								<td style={{ textAlign: 'center', verticalAlign: 'center' }}>
									<a onClick={fitAll}>
										alle {featureCollection.length} Treffer anzeigen
									</a>
								</td>
								<td style={{ textAlign: 'right', verticalAlign: 'center' }}>
									<a title='nächster Treffer' onClick={next}>
										&gt;&gt;
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				{downloaderOverlay}
			</Well>
		</Loadable>
	);
};

export default BPlanInfo;
BPlanInfo.propTypes = {
	featureCollection: PropTypes.array.isRequired,
	selectedIndex: PropTypes.number.isRequired,
	loadingIndicator: PropTypes.bool.isRequired,
	loadingError: PropTypes.bool.isRequired,
	next: PropTypes.func.isRequired,
	previous: PropTypes.func.isRequired,
	fitAll: PropTypes.func.isRequired,
	downloadPlan: PropTypes.func.isRequired,
	downloadEverything: PropTypes.func.isRequired
};
