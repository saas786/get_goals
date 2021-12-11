import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from "@ionic/react";
import { AuthContext } from "components/providers/UserContext";
import { UserCollection } from "components/types/profile";
import { readUserRef } from "firebase/profileFunction";
import { useContext } from "react";
import { useDatabaseObjectData } from "reactfire";

function ProfileCard() {
    const currentUserUid = useContext(AuthContext);
    const uid = currentUserUid.currentUser;
    const currentUserProfileRef = readUserRef(String(uid))

    const {data: userProfile} = useDatabaseObjectData<UserCollection>(
        currentUserProfileRef, {idField: ""}
    )

    return (
        <IonContent>
            {console.log(userProfile)}
            {userProfile &&
                [Object.keys(userProfile)[0]].map((key) => (
                    <IonCard key={key}>
                        <IonCardHeader>
                            <IonCardTitle> {userProfile.userName} </IonCardTitle>
                            <IonCardSubtitle> Current Point : {userProfile.currentPoint} </IonCardSubtitle>
                            <IonCardSubtitle> Total Point : {userProfile.totalPoint} </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                ))
            }
        </IonContent>
    )
}

export default ProfileCard;