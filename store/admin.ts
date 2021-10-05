import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "~/plugins/firebase";
import { UserStore } from "~/store";

type idSatus = {
    id: string;
    status: number;
}

@Module({ name: 'admin', namespaced: true ,stateFactory: true})

export default class AdminStore extends VuexModule {
  //state-------------------------------------

  //getters-----------------------------------

  //mutation----------------------------------
  @Mutation
  private updateStatusMut(idStatus: idSatus){
    console.log(idStatus)
  }
  //action------------------------------------
　// ◉statusを変更
  @Action({rawError: true})
  public updateStatusAct(idStatus:idSatus):void {
    db.collection(`users/${UserStore.userInfo?.uid}/order`).doc(idStatus.id).update({
        status: idStatus.status
    })
    this.updateStatusMut(idStatus)
    }
  }
  
