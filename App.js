import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function OVERSTOCKAPP() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    axios.get('https://overstockapp.glitch.me/proyectos')
      .then(response => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('La respuesta del servidor no es una lista:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del servidor', error);
      });
  }, []);

  const addProject = () => {
    if (!newProject) {
      alert('El nombre del proyecto no puede estar vacío');
      return;
    }
    axios.post('https://overstockapp.glitch.me/proyectos', { nombre: newProject })
      .then(response => {
        if (response.data && response.data.id) {
          setProjects([...projects, response.data]);
          setNewProject('');
        } else {
          console.error('Error en la respuesta al crear el proyecto:', response.data);
        }
      })
      .catch(error => {
        alert('Error al crear el proyecto. Por favor, intenta de nuevo.');
        console.error('Error al crear el proyecto', error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.projectItem}>
      <Text style={styles.projectText}>{item.nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Proyectos</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.input}
        value={newProject}
        onChangeText={setNewProject}
        placeholder="Nombre del proyecto"
      />
      <Button title="Agregar Proyecto" onPress={addProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  projectText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: '80%',
  },
});
