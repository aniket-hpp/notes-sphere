import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeView from './src/Views/HomeView';
import NotesView from './src/Views/NotesView';
import TopBar from './src/Components/TopBar';

import { Stack } from './src/Extras/Types';
import NotesListView from './src/Views/NoteListView';

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='HomeView'
          screenOptions={{gestureEnabled: true, gestureDirection: 'horizontal'}}
        >
          <Stack.Screen 
            options={{header: TopBar}} 
            name='HomeView' 
            component={HomeView}
          />

          <Stack.Screen
            options={{header: TopBar}}
            name='NotesListView'
            component={NotesListView}
          />
           
          <Stack.Screen 
            options={{headerShown: false}}  
            name='NotesView'
            component={NotesView}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App
