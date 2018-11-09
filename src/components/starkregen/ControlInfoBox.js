import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-fa';
import { Well, Button } from 'react-bootstrap';
import Legend from './Legend';

// Since this component is simple and static, there's no parent container for it.
const InfoBox = ({
	pixelwidth,
	selectedSimulation,
	simulationLabels,
	backgrounds,
	selectedBackgroundIndex,
	setBackgroundIndex,
	minified,
	minify,
	legendObject,
	featureInfoModeActivated = false,
	setFeatureInfoModeActivation,
	featureInfoValue
}) => {
	const legend = <Legend legendObjects={legendObject} />;
	let headerColor = '#7e7e7e';
	if (featureInfoValue) {
		for (const item of legendObject) {
			if (featureInfoValue >= item.lt) {
				headerColor = item.bg;
			}
		}
	}
	return (
		<div>
			{!featureInfoModeActivated && (
				<div style={{ marginBottom: 5, textAlign: 'right' }}>
					<Button
						id="cmdShowGetFeatureInfo"
						onClick={() => {
							setFeatureInfoModeActivation(true);
						}}
					>
						<Icon name="crosshairs" />
					</Button>
				</div>
			)}
			{featureInfoModeActivated && (
				<div style={{ marginBottom: 5, float: 'right', width: '50%', height_: '145px' }}>
					<table style={{ width: '100%' }}>
						<tbody>
							<tr>
								<td
									style={{
										opacity: '0.9',
										paddingLeft: '2px',
										paddingRight: '15px',
										paddingTop: '0px',
										paddingBottom: '0px',
										background: headerColor,
										textAlign: 'left'
									}}
								>
									Simulationsergebnis
								</td>
								<td
									style={{
										opacity: '0.9',
										paddingLeft: '0px',
										paddingTop: '0px',
										paddingRight: '2px',
										paddingBottom: '0px',
										background: headerColor,
										textAlign: 'right'
									}}
								>
									<a
										onClick={() => {
											setFeatureInfoModeActivation(false);
										}}
										style={{ color: 'black' }}
									>
										<Icon name="close" />{' '}
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<Well
						bsSize="small"
						style={{
							opacity: '0.9',
							height_: '90%'
						}}
					>
						<table style={{ width: '100%' }}>
							<tbody>
								<tr>
									<td
										style={{
											opacity: '0.9',
											paddingLeft: '0px',
											paddingTop: '0px',
											paddingBottom: '0px'
										}}
									>
										{featureInfoValue!==undefined && (
											<h1 style={{ marginTop: 0, textAlign: 'center' }}>{featureInfoValue} m</h1>
										)}
										{featureInfoValue===undefined && (
											<p>
												mit einem Klick in die Karte erfahren Sie mehr über den simulierten
												Wasserstand.
											</p>
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</Well>
				</div>
			)}
			<table style={{ width: '100%' }}>
				<tbody>
					<tr>
						<td
							style={{
								opacity: '0.9',
								paddingLeft: '0px',
								paddingTop: '0px',
								paddingBottom: '0px'
							}}
						>
							{legend}
						</td>
					</tr>
				</tbody>
			</table>

			<Well bsSize="small">
				<table border={0} style={{ width: '100%' }}>
					<tbody>
						<tr>
							<td
								style={{
									opacity: '0.9',
									paddingLeft: '0px',
									paddingTop: '0px',
									paddingBottom: '0px',
									textAlign: 'left'
								}}
							>
								<h4 style={{ margin: 0 }}>
									<Icon name={selectedSimulation.icon} /> {selectedSimulation.title} {'   '}
								</h4>
							</td>
							<td
								style={{
									textAlign: 'right',
									opacity: '0.9',
									paddingLeft: '0px',
									paddingTop: '0px',
									paddingBottom: '0px'
								}}
							>
								<h4 style={{ margin: 0 }}>
									<a style={{ textDecoration: 'none' }}>
										<Icon
											onClick={() => minify(!minified)}
											style={{ color: '#7e7e7e' }}
											name={minified ? 'chevron-circle-up' : 'chevron-circle-down'}
										/>
									</a>
								</h4>
							</td>
						</tr>
					</tbody>
				</table>
				{!minified && (
					<p style={{ marginBottom: 5 }}>
						{selectedSimulation.subtitle}{' '}
						<a>
							<Icon style={{ paddingLeft: 3, fontSize: 16 }} name="info-circle" />
						</a>
					</p>
				)}
				{!minified && (
					<table border={0} style={{ width: '100%' }}>
						<tbody>
							<tr>
								<td
									style={{
										textAlign: 'center',
										paddingLeft: '0px',
										paddingTop: '0px',
										paddingBottom: '0px'
									}}
								>
									<h5
										style={{
											textAlign: 'center',
											margin: '4px'
										}}
									>
										<b>Simulation</b>
									</h5>
								</td>
								<td
									style={{
										textAlign: 'center',
										paddingLeft: '0px',
										paddingTop: '0px',
										paddingBottom: '5px'
									}}
								>
									<h5
										style={{
											textAlign: 'center',
											margin: '4px'
										}}
									>
										<b>Karte</b>
									</h5>
								</td>
							</tr>
							<tr>
								<td
									style={{
										textAlign: 'center',
										paddingLeft: '0px',
										paddingTop: '0px',
										paddingBottom: '0px'
									}}
								>
									<table
										border={0}
										style={{
											width: '100%'
										}}
									>
										<tbody>
											<tr>
												<td style={{ textAlign: 'center', verticalAlign: 'center' }}>
													{simulationLabels[0]} {simulationLabels[1]}
												</td>
												<td style={{ textAlign: 'center', verticalAlign: 'center' }} />
											</tr>
											<tr>
												<td>
													{simulationLabels[2]} {simulationLabels[3]}
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td
									key={'bgprev' + selectedBackgroundIndex}
									style={{
										textAlign: 'center',
										paddingLeft: '0px',
										paddingTop: '0px',
										paddingBottom: '0px'
									}}
								>
									{backgrounds.map((item, index) => {
										let style;
										if (selectedBackgroundIndex === index) {
											style = {
												border: '3px solid #5f83b8',
												marginLeft: 7
											};
										} else {
											style = {
												//border: '3px solid #818180',
												marginLeft: 7
											};
										}
										return (
											<a
												key={'backgroundChanger.' + index}
												onClick={() => {
													setBackgroundIndex(index);
												}}
											>
												<img style={style} width="36px" src={item.src} />
											</a>
										);
									})}
								</td>
							</tr>
						</tbody>
					</table>
				)}
			</Well>
		</div>
	);
};

export default InfoBox;
InfoBox.propTypes = {
	pixelwidth: PropTypes.number,
	selectedSimulation: PropTypes.object,
	simulationLabels: PropTypes.array,
	backgrounds: PropTypes.array,
	selectedBackgroundIndex: PropTypes.number,
	setBackgroundIndexv: PropTypes.func,
	minified: PropTypes.bool,
	minify: PropTypes.func,
	legend: PropTypes.object,
	featureInfoModeActivated: PropTypes.bool
};

InfoBox.defaultProps = {};