import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { RecipeProvider } from './src/context/RecipeContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </RecipeProvider>
    </AuthProvider>
  );
}
