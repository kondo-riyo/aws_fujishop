import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "~/plugins/firebase";
import { UserStore } from "~/store";

type idSatusType = {
    id: string;
    status: number;
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
        public status: number = 0;
        public users: idName[] = [];

    //getters-----------------------------------
        public get getUsers(): idName[]{
            return this.users;
        }
    //mutation----------------------------------
    @Mutation
    private updateStatusMut(idStatus: idSatusType){
        this.id = idStatus.id
        this.status = idStatus.status
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

}

