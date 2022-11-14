
import { StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    justifyContent: 'spave-between',
  },
  header: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largerHeading: {
    fontSize: 30,
    fontStyle: 'italic',
    paddingVertical: 10
  },
  formTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  title: {
    fontSize: 15,
    fontStyle: 'italic',
    padding: 10
  },
  list: {
    flex: 1,
    color: 'black',
  },
  form:{
    backgroundColor: '#ccd4e0',
    fontSize: 4,
    borderWidth: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles