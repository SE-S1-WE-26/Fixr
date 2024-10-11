import { View, Text } from 'react-native'
import React from 'react'

import Map from '../../components/common/mapView/MapBoxView';
import SelectedWorkerSheet from '../../components/common/mapView/SelectedWorkerSheet';

const MapRenderScreen = () => {
  return (
    <>
        <Map />
        <SelectedWorkerSheet/>
    </>

  )
}

export default MapRenderScreen