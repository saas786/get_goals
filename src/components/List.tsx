import { IonButton, IonItem, IonList } from "@ionic/react";

type ToDoItem = {
    id: string; 
    title: string;
}

type ListProps = {
    items : Array<ToDoItem>;
    removeItem : (id: string) => void;
    editItem : (id: string) => void;
}

const List = ({ items, removeItem, editItem }: ListProps) => {
    return (
        <IonList>
          {items.map((item) => {
            const { id, title } = item;
            return (
              <IonItem className="grocery-item" key={id}>
                <p className="title">{title}</p>
                <div className="btn-container">
                    <IonButton type="button" className="edit-btn" onClick={() => editItem(id)}></IonButton>
                    <IonButton type="button" className="delete-btn" onClick={() => removeItem(id)}></IonButton>
                </div>
              </IonItem>
            );
          })}
        </IonList>
      );
  };
  
  export default List;