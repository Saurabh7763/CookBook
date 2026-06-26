import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { RecipeProvider } from './src/context/RecipeContext';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RecipeProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </RecipeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
