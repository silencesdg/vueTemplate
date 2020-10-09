
import _ from 'lodash';
import datetime from './datetime';
/**
 * 判断是否是合法的入离日期。
 * - 入住日期必须大于当前日期
 * - 离店日期必须大于入住日期
 * - @todo 最大日期跨度不允许超过90天
 * @param  {[type]} checkInDate  [description]
 * @param  {[type]} checkOutDate [description]
 * @return {[type]}           [description]
 */
 export default function assertDates(checkInDate, checkOutDate){
    // 检测有效性
    let errorMsg;
    let rDate = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/
    let checkInDateDiff = new Date().getHours() < 6 ? -1.25 : 0;
    if (typeof checkInDate != 'string' || typeof checkOutDate != 'string') {

        errorMsg = '时间格式不正确';
        console.log("errorMsg",errorMsg)
        return false
    } else if (!rDate.test(checkInDate) || !rDate.test(checkOutDate)) {

        errorMsg = '时间格式不正确';
        console.log("errorMsg",errorMsg)
        return false
    } else if ((datetime.diff(new Date(), checkInDate, checkInDateDiff < 0) < checkInDateDiff || datetime.diff(checkInDate, checkOutDate) <= 0)) {

        errorMsg = '时间不合法';
        console.log("errorMsg",errorMsg)
        return false
    }
    // if(errorMsg){
    //     throw new Error(errorMsg);
    // }
    return true

}