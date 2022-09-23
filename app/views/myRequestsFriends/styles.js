import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  containerList: {
    flex: 3,
  },
  buttonContainerRow: {
    height: 25,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
  },
  textContainerRow: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonTxtRow: {
    color: '#FFF',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemContent: {
    color: '#FFF',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 5,
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtn: {
    width: 35,
    height: 35,
    tintColor: '#FFF',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
  },

  //MODAL
  txtModal: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubcontainer: {
    height: '30%',
    width: '90%',
    backgroundColor: '#6685A4',
    paddingHorizontal: 10,
  },
  modalHeaderContainer: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBtnClose: {
    width: 25,
    height: 25,
    tintColor: '#FFF',
  },
});
