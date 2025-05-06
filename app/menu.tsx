import {
  StyleSheet,
  Appearance,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { MENU_ITEMS } from "@/constants/MenuItems";
import MENU_IMAGES from "@/constants/MenuImages";
export default function MenuScreen() {
  const colorScheme = Appearance.getColorScheme() ?? "dark"; // fallback to 'light'
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const separatorComponent = () => <View style={styles.separator} />;
  const footerComponent = () => <Text style={styles.footerComp}>End Of Menu</Text>;

  return (
    <Container style={styles.container}>
      <FlatList
        data={MENU_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={separatorComponent}
        ListFooterComponent={footerComponent}
        ListEmptyComponent={<Text>Menu is empty</Text>}
        renderItem={({ item }) => (
          <View style={styles.rows}>
            <View style={styles.menuTextRow}>
              <Text style={[styles.menuTitle, styles.menuDesc]}>
                {item.title}
              </Text>
              <Text style={styles.menuDesc}>{item.description}</Text>
            </View>
            <Image style={styles.menuImage} source={MENU_IMAGES[item.id - 1]} />
          </View>
        )}
      />
    </Container>
  );
}

function createStyles(
  theme: typeof Colors.light | typeof Colors.dark,
  colorScheme: "light" | "dark"
) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#000",
      width: "50%",
      maxWidth: 300,
      marginHorizontal: "auto",
      marginBottom: 10,
    },
    footerComp: {
      marginHorizontal: "auto",
      color: theme.text,
    },
    rows: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      maxHeight: 100,
      borderStyle: "solid",
      borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden",
      marginHorizontal: "auto",
      marginBottom: 10,
    },
    menuTextRow: {
      flexGrow: 1,
      marginRight: 10,
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    menuTitle: {
      fontSize: 18,
      textDecorationLine: "underline",
    },
    menuDesc: {
      fontSize: 16,
      color: theme.text,
    },
    menuImage: {
      width: 100,
      height: 100,
    },
  });
}
