export function shorten(data : string){
    return data.slice(0,3).concat("...").concat(data.slice(data.length-3,data.length))
}