import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function ShownProfilAidant() {

const BACKEND_ADDRESS = '192.168.10.128:3000';
const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log('search', user.searchResult[0].token)
    fetch(`http://${BACKEND_ADDRESS}/aidantUsers/Infos/${user.searchResult[0].token}`)
      .then(response => response.json())
      .then(data => {
        console.log('$$$', data);
        // if (data.result)  {
        // dispatch(displayProfil)
      });
  }, []);

  return (
    <View>
      <Text>ShownProfilAidant</Text>
    </View>
  );
}
