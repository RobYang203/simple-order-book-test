import React from "react";
import { array } from "prop-types";
import { Text, Th, Thead, Tr } from "@chakra-ui/react";

function TableHeader({ headers }) {
  return (
    <Thead>
      <Tr>
        {headers.map(({ name }, index) => {
          return (
            <Th key={index}>
              <Text textStyle="subTitle2" color="#000">
                {name}
              </Text>
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
}

TableHeader.propTypes = {
  headers: array.isRequired,
};

export default TableHeader;
