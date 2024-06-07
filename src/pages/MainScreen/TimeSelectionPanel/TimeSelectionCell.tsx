import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { DateTime } from "luxon";

import dateToUserTimeZone from "../../../utils/dateToUserTimeZone";

interface Props {
  cellId: number;
  scrollToCell: (cellId: number, animatedScroll?: boolean) => void;
  isCurrentCell: boolean;
  time: string;
  temperature?: number;
  apparentTemperature?: number;
  temperatureUnits: string;
  windspeedUnits: string;
  cellWidth: number;
}

const TimeSelectionCell = (props: Props) => {
  const [rawDate, setRawDate] = useState<DateTime | undefined>();

  useEffect(() => {
    setRawDate(dateToUserTimeZone(props.time));
  }, []);

  return (
    <Pressable
      onPress={() => props.scrollToCell(props.cellId)}
      style={[
        styles.container,
        { width: props.cellWidth },
        props.isCurrentCell && styles.ifCurrentCellContainer,
      ]}
    >
      {(rawDate?.hour === 0 || props.cellId === 0) && (
        <Text style={props.isCurrentCell && styles.ifCurrentCellTitleText}>
          {/* day of week */}
          {rawDate?.toFormat("EEEE")}
        </Text>
      )}
      <Text style={props.isCurrentCell && styles.ifCurrentCellText}>
        {/* hour */}
        {rawDate?.toFormat("hh:mm a")}
      </Text>
      <Text style={props.isCurrentCell && styles.ifCurrentCellTitleText}>
        {props.temperature ? `${props.temperature}${props.temperatureUnits}` : "-"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderColor: "black",
  },
  ifCurrentCellContainer: {},
  ifCurrentCellText: {
    fontWeight: "500",
    fontSize: 15,
  },
  ifCurrentCellTitleText: {
    fontWeight: "bold",
    fontSize: 17,
  },
});

// only rerender the component if any of these values has changed
export default React.memo(TimeSelectionCell, (prevProps, nextProps) => {
  return (
    prevProps.time === nextProps.time &&
    prevProps.isCurrentCell === nextProps.isCurrentCell &&
    prevProps.temperature === nextProps.temperature
  );
});
