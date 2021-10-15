import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "../plugins/firebase";
import { UserStore } from "../store";

type idSatusType = {
    id: string;
    status: string;
    uid: string;
}
type idName = {
    orderId?: string;
    uid?: string;
    name?: string;
}

@Module({ name: 'admin', namespaced: true ,stateFactory: true})

export default class AdminStore extends VuexModule {
    //state-------------------------------------
        public id: string ='';
        public status: string = '';
        public users: idName[] = [];
        public storeLogItems: any[] = [];

    //getters-----------------------------------
        public get getUsers(): idName[]{
            return this.users;
        }

        public get getstoreLogItems(): any[] {
            return this.storeLogItems
        }
        
    //mutation----------------------------------
    @Mutation
    private updateStatusMut(idStatus: idSatusType){
        this.id = idStatus.id
        this.status = idStatus.status
    }

    @Mutation
    public fetchLogItemsMut(logItems:any[]):void{
        this.storeLogItems = logItems;
    }

    // @Mutation
    // private addAdminMut(idName: idName){
    //     this.getUsers.push(idName)
    // }

    //action------------------------------------
      // ◉statusを変更
        @Action({rawError: true})
        public updateStatusAct(idStatus:idSatusType):void {
            db.collection(`users/${idStatus.uid}/order`).doc(idStatus.id).update({
                status: idStatus.status
            })
            this.updateStatusMut(idStatus)
        }

      // ◉admin/{adminId} のDBにnameとorderIdとuidを追加
        @Action({rawError: true})
        // public addAdminAct(idName:idName):void {
        //     console.log(idName.name)
        //     db.collection(`admin`).add({
        //         name: idName.name,
        //         orderId: idName.orderId,
        //         uid: idName.uid
        //     })
        //     this.addAdminMut(idName)
        // }
        public addAdminAct(idName:idName):void {
            console.log(idName)
            // this.addAdminMut(idName)
            db.collection(`users`).doc(idName.uid).set({
                name: idName.name,
                orderId: idName.orderId,
                uid: idName.uid
            })
        }

        //logItemsをfetchする
        @Action({rawError: true})
        public async fetchLogItemsAct(params: string):Promise<void> {
        await db
        .collection(`users/${params}/order`)
        .get()
        .then((orders) => {
          let logItems: any[] = []
        //   if(orders.docs.length>thos) 
          orders.forEach((order) => {
            if(order.data().status!=0){
                logItems.push(order.data());
            }
          });   
          this.fetchLogItemsMut(logItems);
        });
        }  

}

