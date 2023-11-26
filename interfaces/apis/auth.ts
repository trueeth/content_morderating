import request from '../baseApi/request'


export declare namespace TReqAuth{
  type identify={
    Username:string,
    Password:string
  }
}

export declare namespace TResAuth{
  type identify={
      tokenValue:string
  }
}


export const apiIdentifyAuth = (params :  TReqAuth.identify ) => {
  return request.get<TResAuth.identify>('identity/auth',{params:params})
}
