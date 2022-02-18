import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Modal , TouchableOpacity } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../Utils/HeaderBar";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { addCarrier, registeredFleet, deleteFleet, reset } from '../../Redux/actions/index.js'
import { useSelector, useDispatch } from "react-redux";
import { set } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/core";
import ModalAlert from "./ModalAlert.js";

const NewCarrier = () => {

  const navigation = useNavigation();
  const respAddCarrier = useSelector((store) => store.respAddCarrier);
  function checkEmail(eMail) {
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var check = expReg.test(eMail)
    return check;
  }
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [eMail, setEMail] = useState('');
  const fleet = useSelector((store) => store.registeredFleet);
  const respDelete = useSelector((store) => store.respDeleteUser);

  const [modalAlert2, setModalAlert2] = useState(false);
  const [modalAlert1, setModalAlert1] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    dispatch(registeredFleet());
    if (respAddCarrier) {
      if (respAddCarrier.mensaje === 'eMail usado') {
        setModalAlert2(true)
      }
    }


  }, [dispatch, respAddCarrier]);

  console.log("REPUESTA DEL DELETE", respDelete);
  /* s */
  /*     useEffect(() => {
          if (respDelete) {
              if (respDelete.mensaje === "Usuario eliminado") {
                  alert('USUARIO ELMINADO CON EXITO')
              }
          }
  
          return () => {
              reset()
          };
      }, [dispatch]); */


  const modalHandleDelete = (props) => {
    const id = props
    console.log("eSTA ES LA IP QUE ENVIO", id)
    setModalDelete(true)
    setId(id)
  };

  const handleDelete = (props) => {
    dispatch(deleteFleet(props))
    setModalDelete(false)
    dispatch(registeredFleet());
  };


  console.log("ESTA ES LA ID A BORRAR", id)
  const handleSubmit = () => {
    const data = {
      name: name,
      lastName: lastname,
      eMail: eMail,
    }
    const check = checkEmail(data.eMail)
    if (check) {
      dispatch(addCarrier(data))
      console.log(data)
      setModalView(false)
    } else {
      setModalAlert1(true)
      setModalView(false)
    }
  }





  console.log("Esto son los fleet", fleet)
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar screen="null" />
        <View style={styles.containerHeaders}>
          <Text style={{ fontSize: hp("2.5%"), fontWeight:"bold" }}>
            AÑADE TRANSPORTISTAS A TU FLOTA
          </Text>
          <Icon name="bus-outline" style={styles.icons} />
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>
            AÑADE UN NUEVO TRANSPORTISTA
          </Text>
        </View>
        <View style={styles.containerCards}>
          <View style={styles.cards}>
            <View style={styles.insideCard}>
              <View style={styles.viewsInputs}>
                <Icon name="enter-outline" style={styles.icon_email} />
                <TextInput
                  name="name"
                  placeholder="Nombre"
                  style={styles.textPlaceholder}
                  onChangeText={(e) => setName(e)}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="enter-outline" style={styles.icon_email} />
                <TextInput
                  name="lastname"
                  placeholder="Apellido"
                  style={styles.textPlaceholder}
                  onChangeText={(e) => setLastname(e)}
                />
              </View>
              <View style={styles.viewsInputs}>
                <Icon name="mail-outline" style={styles.icon_email} />
                <TextInput
                  name='e-mail'
                  placeholder="Ingrese e-mail del transportista"
                  style={styles.textPlaceholder}
                  onChangeText={(e) => setEMail(e)}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => setModalView(true)}
                >
                  <Text style={styles.btnText}>Agregar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>TUS TRANSPORTISTAS</Text>
        </View>
        <View style={styles.containerCards}>
          <View style={styles.cards}>
            <View style={styles.insideCard}>
              {fleet ? (
                fleet.map((user, index) => {
                  return (
                    <View style={styles.viewUsers} key={index}>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() =>
                            modalHandleDelete(user.transportista.id)
                          }
                        >
                          <Icon name="close-outline" style={styles.iconX} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(
                              "VehiculeDetails",
                              user.vehiculo
                            )
                          }
                        >
                          <Icon
                            name="bus-outline"
                            style={styles.iconVehicule}
                          />
                        </TouchableOpacity>
                        <View style={styles.textPosition}>
                          <Text style={styles.textUsers}>
                            {user.transportista.name}
                          </Text>
                          <Text style={styles.textUsers}>
                            {user.transportista.eMail}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          onDismiss={() => console.log("close")}
          onShow={() => console.log('open')}
          transparent
          visible={modalView}
        >
          <View style={styles.containerModal}>
            <View style={styles.viewModal}>
              <View style={styles.textModal}>
                <Icon name="person-add" style={styles.icon_modal} />
                <Text>Revisa si los datos a enviar estan bien</Text>
                <Text>Nombre: {name}</Text>
                <Text>Apellido: {lastname}</Text>
                <Text>Email: {eMail}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.btnModal} >
                    <Text style={styles.btnText2} onPress={() => handleSubmit()} >
                      Agregar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnModal} >
                    <Text style={styles.btnText2} onPress={() => setModalView(false)} >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          onDismiss={() => console.log("close")}
          onShow={() => console.log('open')}
          transparent
          visible={modalDelete}
        >
          <View style={styles.containerModal}>
            <View style={styles.DeleteModal}>
              <View style={styles.textModal}>
                <Icon name="close-circle" style={styles.icon_modal} />
                <Text>Estas seguro que deseas eliminar a este usuario?</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.btnModal} >
                    <Text style={styles.btnText} onPress={() => handleDelete(id)}  >
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnModal} >
                    <Text style={styles.btnText} onPress={() => setModalDelete(false)}  >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          onDismiss={() => console.log("close")}
          onShow={() => console.log('open')}
          transparent
          visible={modalAlert1}
        >
          <ModalAlert
            text={'El e-mail ingresado no es valido, por favor ingrese otro'}
            setModal={setModalAlert1}
          />
        </Modal>
        <Modal
          animationType="slide"
          onDismiss={() => console.log("close")}
          onShow={() => console.log('open')}
          transparent
          visible={modalAlert2}
        >
          <ModalAlert
            text={'Usuario ya registrado'}
            setModal={setModalAlert2}
          />
        </Modal>
      </ScrollView>
    </View>
  )
}


export default NewCarrier

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'

  },
  viewModal: {
    height: hp('30%'),
    width: wp('70%'),
    backgroundColor: '#fff'
  },
  DeleteModal: {
    height: hp('23%'),
    width: wp('70%'),
    backgroundColor: '#fff'
  },
  alertModal: {
    height: hp('29%'),
    width: wp('70%'),
    backgroundColor: '#fff'
  },
  textModal: {
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: hp('4%')
  },
  containerHeaders: {
    flex: 1,
    marginLeft: wp("5%"),
    paddingBottom: wp("2%"),
    flexDirection: 'row',
    
  },
  icons: {
    fontSize: hp("3.5}%"),
    color: "#ff1a00",
    marginLeft: hp("1%"),
    marginTop: hp('-0.5%')
  },
  icon_email: {
    fontSize: hp("3%"),
    color: "#000",
    padding: hp('1%'),
    marginLeft: hp("1%"),
    marginTop: hp('-0.5%')
  },
  icon_modal: {
    fontSize: hp("5%"),
    color: "#ff1c49",
  },
  viewAnterior: {
    padding: wp("2%"),
    backgroundColor: "#DDDDDD", //"#FFC107",
    width: wp("95%"),
    marginLeft: wp("2%"),
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderColor: "#ff1c49",
    borderWidth: wp('0.32%')
  },
  textAnterior: {
    fontSize: hp("1.60%"),
    marginLeft: wp("2%"),
    fontWeight: "bold",
  },
  containerCards: {
    flex: 1,
    width: wp("95%"),
    marginHorizontal: wp("2.5%"),
    marginTop: wp("1%"),
    paddingBottom: wp("2.75%"),
  },
  cards: {
    backgroundColor: "#F6F6F6",
    borderRadius: wp("3%"),
    shadowOpacity: 80,
    elevation: hp('0.3%'),
  },
  insideCard: {
    width: wp("91%"),
    padding: wp("4%"),
  },
  textFinished: {
    color: "red",
    fontWeight: "bold",
  },
  price: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  viewUsers: {
    padding: wp("2%"),
    backgroundColor: "#DDDDDD", //"#FFC107",
    marginTop: wp("1%"),
    marginBottom: wp("2.5"),
    borderColor: "#DDDDDD",
    width: wp('87%'),
    borderBottomWidth: wp("0.55%"),
    borderTopWidth: wp("0.55%"),
  },
  textPosition: {
    marginTop: hp('1'),
    marginBottom: hp('1'),
    marginLeft: wp('3%')
  },
  textUsers: {
    fontSize: hp("1.6%"),
    marginRight: wp("30%"),
  },
  iconX: {
    fontSize: hp("4%"),
    color: "red",
    marginTop: hp('1'),
    marginBottom: hp('1'),
  },
  iconVehicule: {
    fontSize: hp("3.6%"),
    color: "#000",
    marginTop: hp('1'),
    marginBottom: hp('1'),
    marginLeft: hp('1%')
  },
  viewsInputs: {
    flexDirection: 'row',
    padding: wp("2%"),
    backgroundColor: "#DDDDDD", //"#FFC107",
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderColor: "#DDDDDD",
    width: wp('87%'),
    height: hp('6.7%'),
    borderBottomWidth: wp("0.55%"),
    borderTopWidth: wp("0.55%"),
  },
  textPlaceholder: {
    fontSize: hp("1.8%"),
    marginLeft: wp("2%"),
  },
  btnModal: {
    width: wp('20%'),
    color: "black",
    margin: hp('1%'),
    height: hp('4%'),
    backgroundColor: "#ff1c49",
    borderRadius: hp('1%'),
    marginTop: hp("3%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 50,
    elevation: 10,
  },
  Button: {
    width: wp('50%'),
    color: "black",
    height: hp('6%'),
    backgroundColor: "#ff1c49",
    borderRadius: hp('1%'),
    marginTop: hp("1%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 80,
    elevation: 15,
    marginLeft: wp('18%')
  },
  btnText: {
    fontSize: hp("2.5%"),
    fontWeight:"bold",
    marginLeft: wp("2%"),
    color: '#ffff'
  },
  btnText2: {
    fontSize: hp("2%"),
    fontWeight:"bold",
    marginLeft: wp("0.8%"),
    color: 'white'
  }
})