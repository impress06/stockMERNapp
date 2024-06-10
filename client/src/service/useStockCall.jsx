import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStockSuccess,
  fetchStart,
} from "../features/stockSlice";

const useStockCall = () => {
  const { axiosPrivateSimpleTokenInsist ,axiosPrivateSimpleTokenFileInsist } = useAxios();

  const dispatch = useDispatch();

  const getStock = async (url, limit = null, page = null, getParamsVariable = {},categoryname=null) => {
    dispatch(fetchStart());
    
    const {action,actionField,value}=getParamsVariable
    

    try {
      const params = {
        limit: limit,
        page: page,
        categoryname:categoryname
      };
      if (value) {
        params[`${action}[${actionField}]`] = value;
      }

      const response = await axiosPrivateSimpleTokenInsist.get(`/${url}`, {
        params,
      });

      const ApiData = response.data.data;
      const ApiPegination = response.data.detail;

      dispatch(fetchStockSuccess({ ApiData, url, ApiPegination }));
    } catch (error) {
      toastErrorNotify("Firms dont pull from server");
      dispatch(fetchFail());
    }
  };


  const deleteStock = async (url, id) => {
    dispatch(fetchStart());

    try {
      await axiosPrivateSimpleTokenInsist.delete(`/${url}/${id}`);

      getStock(url);
      toastSuccessNotify("Başarılı ile silindi")
    } catch (error) {
      toastErrorNotify("Firms dont pull from server");
      dispatch(fetchFail());
    }
  };



  const putStock = async (url, id,data) => {
    dispatch(fetchStart());

    try {
      await axiosPrivateSimpleTokenInsist.put(`/${url}/${id}`,data);

      getStock(url);
      toastSuccessNotify("Updated Success")
    } catch (error) {
      toastErrorNotify("Firms dont pull from server");
      dispatch(fetchFail());
    }
  };


  const PutStockFile = async (url, id,data) => {
  dispatch(fetchStart());

  try {
    
    const response = await axiosPrivateSimpleTokenFileInsist.put(`/${url}/${id}`, data);
    console.log("Response from Server:", response.data);

    getStock(url);
    toastSuccessNotify("Başarıyla eklendi");
  } catch (error) {
    console.log("Error:", error);
    toastErrorNotify("Veriler sunucudan çekilemedi");
    dispatch(fetchFail());
  }
};


  const AddStockFile = async (url, formDataToSend) => {
    dispatch(fetchStart());

    console.log("formdatasend",formDataToSend)

    try {
     
      await axiosPrivateSimpleTokenFileInsist.post(`/${url}`, formDataToSend)

      getStock(url);
      toastSuccessNotify("Başarılı ile Eklendi")
    } catch (error) {
      toastErrorNotify("Firms dont pull from server");
      dispatch(fetchFail());
    }
  };
  const postStock = async (url, info) => {
    dispatch(fetchStart())
    try {
      await axiosPrivateSimpleTokenInsist.post(`/${url}`, info)
      toastSuccessNotify(`${url} kayıdı eklenmiştir.`)
      getStock(url)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} kaydi eklenemiştir.`)
    }
  }


  return { getStock, deleteStock,PutStockFile,AddStockFile,putStock,postStock };
};

export default useStockCall;
