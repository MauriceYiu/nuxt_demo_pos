// import instance from "@/plugins/request";

export const login = (instance,data) => {
    return instance({
        url: "login",
        method: "POST",
        headers:{
            Authorization:data
        },
        data:{}
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}