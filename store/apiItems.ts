import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import axios from 'axios';
import { itemType } from "~/types/itemType";
import { rakuten } from '~/types/rakutenType';

@Module({ name: 'apiItems', namespaced: true ,stateFactory: true})

 export default class ApiItemsStore extends VuexModule {
    
    // state------------------------------------------
    public itemsFromApi:itemType[] = [];


    // getters-----------------------------------------
    public get getItemsFromApi():itemType[]{
      return this.itemsFromApi
    }

    public get getItemDetail(): (detailParamsId: string)=>itemType| undefined{
      return (detailParamsId: string)=>{
        return this.itemsFromApi.find(item => item.id === detailParamsId)
      }
    }


    @Mutation
    private fetchApiItemsMut(itemsFromAPi: any): void{
       // ここで楽天の商品を加工してDBの商品情報と同じデータ構造にする

       const ApiItemsToState:itemType[] = itemsFromAPi!.map(
         (itemFromAPi:any) => ({name:itemFromAPi.Item.itemName,
                          price:Number(itemFromAPi.Item.itemPrice),
                          description:itemFromAPi.Item.itemCaption,
                          img:itemFromAPi.Item.mediumImageUrls[0].imageUrl,
                          id:itemFromAPi.Item.itemCode,
                          rank:Number(itemFromAPi.Item.rank)}))
       this.itemsFromApi = ApiItemsToState


    }

    @Action({rawError: true})
    public async fetchApiItemsAct(): Promise<void>{
      const sweetsRankUrl =
      'https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628?format=json&genreId=568410&applicationId=1040019384827098233';
    const resUrl = await axios.get<rakuten.api.items.Response>(sweetsRankUrl);
    //const itemsFromAPi = JSON.stringify(resUrl.data.Items)
    const itemsFromAPi = resUrl.data.Items
    this.fetchApiItemsMut(itemsFromAPi)
    }
 }

