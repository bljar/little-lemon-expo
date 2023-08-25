import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { Alert, SafeAreaView, StyleSheet, FlatList } from "react-native";
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "../utils/database";
import { useUpdateEffect } from "../utils";
import debounce from "lodash.debounce";
import HeroSection from "../components/Hero";
import Filters from "../components/Filter";
import Dish from "../components/Dish";

SplashScreen.preventAutoHideAsync();

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["Starters", "Mains", "Desserts", "Drinks"];

export default function HomeScreen() {
  let menuItems = [];
  const [data, setData] = React.useState([]);
  const [searchBarText, setSearchBarText] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [filterSelections, setFilterSelections] = React.useState(
    sections.map(() => false)
  );

  React.useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          const response = await fetch(API_URL);
          const json = await response.json();
          menuItems = json.menu.map((item, index) => ({
            ...item,
            id: index,
            imageUrl: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
          }));
          saveMenuItems(menuItems);
        }

        setData(menuItems);
        if (!data.length) {
          setData(menuItems);
        }
        console.log(data);
      } catch (error) {
        console.error(error);
        Alert.alert("Data Error", error.message);
      } finally {
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        setData(menuItems);
      } catch (e) {
        Alert.alert("Filter Error", e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = React.useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = React.useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeroSection searchInput={searchBarText} onChange={handleSearchChange} />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <Dish key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
