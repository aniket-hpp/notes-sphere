import {NavigationProp, useNavigation} from "@react-navigation/native"
import { StackList } from "./Types"

export const useAppNavigation = () => {
    return useNavigation<NavigationProp<StackList>>();
};