import React from "react";
import PropTypes from "prop-types";
import { Well } from "react-bootstrap";
import { Icon } from "react-fa";
import Color from "color";

// Since this component is simple and static, there's no parent container for it.
const InfoBox = ({
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
  colorize,
  pixelwidth,
  header,
  headerColor,
  links,
  title,
  subtitle,
  additionalInfo,
  zoomToAllLabel,
  currentlyShownCountLabel,
  fotoPreview
}) => {
  const currentFeature = featureCollection[selectedIndex];

  if (currentFeature) {
    let headerBackgroundColor = Color(headerColor);

    let textColor = "black";
    if (headerBackgroundColor.isDark()) {
      textColor = "white";
    }
    let llVis = (
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td
              style={{
                textAlign: "left",
                verticalAlign: "top",
                background: headerBackgroundColor,
                color: textColor,
                opacity: "0.9",
                paddingLeft: "3px",
                paddingTop: "0px",
                paddingBottom: "0px"
              }}
            >
              {header}
            </td>
          </tr>
        </tbody>
      </table>
    );

    return (
      <div>
        {fotoPreview}
        {llVis}
        <Well bsSize="small" onClick={panelClick}>
          <div>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "left", verticalAlign: "top" }}>
                    <table border={0} style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "5px",
                              maxWidth: "160px",
                              overflowWrap: "break-word"
                            }}
                          >
                            <h5>
                              <b>{title}</b>
                            </h5>
                          </td>
                          <td style={{ textAlign: "right" }}>{[links]}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            <h6>
                              {additionalInfo.split("\n").map((item, key) => {
                                return (
                                  <span key={key}>
                                    {item}
                                    <br />
                                  </span>
                                );
                              })}
                            </h6>
                            <p>{subtitle}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td />
                  <td style={{ textAlign: "center", verticalAlign: "center" }}>
                    <a onClick={fitAll}>{zoomToAllLabel}</a>
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    title="vorheriger Treffer"
                    style={{ textAlign: "left", verticalAlign: "center" }}
                  >
                    <a onClick={previous}>&lt;&lt;</a>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "center" }}>
                    {currentlyShownCountLabel}
                  </td>

                  <td
                    title="nächster Treffer"
                    style={{ textAlign: "right", verticalAlign: "center" }}
                  >
                    <a onClick={next}>&gt;&gt;</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Well>
      </div>
    );
  } else if (items.length > 0) {
    return (
      <Well bsSize="small" pixelwidth={pixelwidth}>
        <h5>Keine POI gefunden!</h5>
        <p>
          Für mehr POI, Ansicht mit <Icon name="minus-square" /> verkleinern. Um nach Themenfeldern
          zu filtern, das
          <a onClick={() => showModalMenu("filter")}>
            {" "}
            Men&uuml;&nbsp;
            <Icon name="bars" style={{ color: "black" }} /> &ouml;ffnen.
          </a>
        </p>
        <div align="center">
          <a onClick={fitAll}>{items.length} POI in Wuppertal</a>
        </div>
      </Well>
    );
  } else {
    return null;
  }
};

export default InfoBox;
InfoBox.propTypes = {
  featureCollection: PropTypes.array.isRequired,
  filteredPOIs: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  fitAll: PropTypes.func.isRequired,
  showModalMenu: PropTypes.func.isRequired,
  panelClick: PropTypes.func.isRequired
};

InfoBox.defaultProps = {
  featureCollection: [],
  filteredPOIs: [],
  selectedIndex: 0,
  next: () => {},
  previous: () => {},
  fitAll: () => {},
  showModalMenu: () => {}
};
