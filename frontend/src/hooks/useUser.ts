import { useRecoilValue } from "recoil";
import { userAtom } from "../recoil/atom/userAtom";

export const useUser = () => {
    const user = useRecoilValue(userAtom);
    return user;
}