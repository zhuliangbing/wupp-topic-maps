import React from 'react';
import Datengrundlage from './Help10Datengrundlage';
import Introduction from './Help05Introduction';
import Karteninhalt from './Help20Karteninhalt';
import InKartePositionieren from './Help30InKartePositionieren';
import MeinStandort from './Help40MeinStandort';
import WasserstandAbfragen from './Help50WasserstandAbfragen';
import SimulierteSzenarien from './Help60SimulierteSzenarien';
import Aussagekraft from './Help70AussagekraftDerSimulationen';
import ModellfehlerMelden from './Help80ModellfehlerMelden';

import GenericModalApplicationMenu from '../commons/GenericModalApplicationMenu';


const ModalHelpAndInfo = ({
	uiState,
	uiStateActions
}) => {
	return (
		<GenericModalApplicationMenu
			uiState={uiState}
			uiStateActions={uiStateActions}
      menuIntroduction={<Introduction uiStateActions={uiStateActions} />}
      menuIcon="info"
			menuTitle="Kompaktanleitung und Hintergrundinformationen"
			menuSections={[
				<Datengrundlage uiState={uiState} uiStateActions={uiStateActions} />,
				<Karteninhalt uiState={uiState} uiStateActions={uiStateActions} />,
				<InKartePositionieren uiState={uiState} uiStateActions={uiStateActions} />,
				<MeinStandort uiState={uiState} uiStateActions={uiStateActions} />,
				<WasserstandAbfragen uiState={uiState} uiStateActions={uiStateActions} />,
				<SimulierteSzenarien uiState={uiState} uiStateActions={uiStateActions} />,
				<Aussagekraft uiState={uiState} uiStateActions={uiStateActions} />,
				<ModellfehlerMelden uiState={uiState} uiStateActions={uiStateActions} />
      ]}
      //menuFooter:
		/>
	);
};
export default ModalHelpAndInfo;