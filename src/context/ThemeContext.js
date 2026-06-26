import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState('light'); // default

    useEffect(() => {
        // Load persisted theme
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('appTheme');
                if (savedTheme) {
                    setTheme(savedTheme);
                } else {
                    setTheme(systemColorScheme || 'light');
                }
            } catch (e) {
                console.error('Failed to load theme', e);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem('appTheme', newTheme);
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    };

    const colors = {
        light: {
            background: 'bg-white',
            text: 'text-gray-900',
            subText: 'text-gray-500',
            card: 'bg-gray-50',
            border: 'border-gray-100',
            primary: 'text-amber-500',
            statusBar: 'dark-content'
        },
        dark: {
            background: 'bg-slate-950',
            text: 'text-gray-100',
            subText: 'text-gray-400',
            card: 'bg-slate-900',
            border: 'border-slate-800',
            primary: 'text-amber-400',
            statusBar: 'light-content'
        }
    };

    const themeStyles = colors[theme];

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
