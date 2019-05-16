import Taro, { Component,} from '@tarojs/taro';
import { reportUrl } from '../../../config';
import { Canvas } from '@tarojs/components'
import {formatName,forIdCard,formatDate,dateDiff} from '../../../utils/utils'
import './index.scss'

//img
import Inf from '../../../images/report/essential_inf.jpg'
// import Frame from  '../../images/bg_Frame.png'
import IdCard from  '../../../images/report/id_report.png'
import IdMark from  '../../../images/report/id_mark.png'
import Re_Num from  '../../../images/report/report_number.png'
// import ReportNum from  '../../images/report_number.png'
import BlackList from  '../../../images/report/blacklist.png'
import Credit from  '../../../images/report/credit.png'
import CreditLoan from  '../../../images/report/credit_loan.png'
import Overdue from  '../../../images/report/overdue_risk.png'
import LawInf from  '../../../images/report/law_inf.png'

class  Inc extends Component{

  state={
    name:'',
    age:'',
    idCardNo:'',
    score_Text:'',
    reportCode:'',
    score:'',
    cheatResultCode:'',
    applyTime:'',
    lendingDetailsData:'',
    loanDetailsData:'',
    overdueDetailsData:'',
    cheatEvaluation:'',
    overdueEvaluation:'',
    loanEvaluation:'',
    lendEvaluation:'',
    lawEvaluation:'',
    lawDataList:'',
    address:'',
  }
  componentDidMount () {
    // console.log(globalData.status)
    // if(globalData.status !=1){
    //   Taro.navigateTo({
    //     url:'/'
    //   })
    // }
    // else {
    //
    // }
    //从属性里复制
    Taro.showLoading({
      title: '正在拼命加载中',
      mask:'true'
    })
    // let userObj = {userName: '刘进', phone: '15167790992',idCardNo:'420115198308220072'}
    // formData.append('user',userObj);
    let params = this.$router.params
    console.log(params,'iddddddddd')
    let formData = new FormData();
    if(params.trade_no){
      formData.append('orderNo',params.trade_no)
      fetch(reportUrl+'/getCheckResult',{
        method: 'POST',
        body:formData,
      })
        .then(res=>{
          return res.json()
        })
        .then(res =>{
          Taro.hideLoading()
          //仪表图
          var canvas=document.getElementById('canvas');
          function getViewPort(){
            var viewHeight=window.innerHeight||document.documentElement.clientHeight;
            var viewWidth=window.innerWidth||document.documentElement.clientWidth;
            document.body.style.width=viewWidth;
            canvas.width=viewWidth;
            canvas.height=viewHeight;
          }

          getViewPort();
          var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            cWidth = canvas.width,
            cHeight = canvas.height,
            // score = canvas.attributes['data-score'].value,
            score = res.data.score,
            // stime = canvas.attributes['data-time'].value,
            stage = ['较差', '中等', '良好', '优秀', '极好'],
            radius = 150,
            deg0 = Math.PI / 9,
            deg1 = Math.PI * 11 / 45;

          if (score < 0 || score > 100) {
            alert('信用分数区间：0-100');
          } else {
            var dot = new Dot(),
              dotSpeed = 0.02, //0.03 3.07 //控制刻度比例
              textSpeed = Math.round(dotSpeed * 20 / deg1),
              angle = 0,
              credit = 0;
            (function drawFrame() {

              ctx.save();
              ctx.clearRect(0, 0, cWidth, cHeight);
              ctx.translate(cWidth / 2, cHeight / 2);
              ctx.rotate(8 * deg0);  //仪表盘转角度

              dot.x = radius * Math.cos(angle);
              dot.y = radius * Math.sin(angle);

              var aim = (score - 0) * deg1 / 20; //最外线
              if (angle < aim) {
                angle += dotSpeed;
              }
              dot.draw(ctx);
              if (credit < score - textSpeed) {
                credit += textSpeed;
              } else if (credit >= score - textSpeed && credit < score) {
                credit += 1;
              }
              text(credit);
              ctx.save();
              ctx.beginPath();
              ctx.lineWidth = 3;
              ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
              ctx.arc(0, 0, radius, 0, angle, false);
              ctx.stroke();
              ctx.restore();

              window.requestAnimationFrame(drawFrame);
              ctx.save(); //中间刻度层
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
              ctx.lineWidth = 10;
              ctx.arc(0, 0, 135, 0, 11 * deg0, false);
              ctx.stroke();
              ctx.restore();
              ctx.save(); // 刻度线
              for (var i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
                ctx.moveTo(140, 0);
                ctx.lineTo(130, 0);
                ctx.stroke();
                ctx.rotate(deg1);
              }
              ctx.restore();
              ctx.save(); // 细分刻度线
              for (i = 0; i < 25; i++) {
                if (i % 5 !== 0){
                  ctx.beginPath();
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
                  ctx.moveTo(140, 0);
                  ctx.lineTo(133, 0);
                  ctx.stroke();
                }
                ctx.rotate(deg1 / 5);
              }
              ctx.restore();
              ctx.save(); //信用分数
              ctx.rotate(Math.PI / 2);
              for (i = 0; i < 6; i++) {
                ctx.fillStyle = 'rgba(255, 255, 255, .4)';
                ctx.font = '10px Microsoft yahei';
                ctx.textAlign = 'center';
                ctx.fillText(0 + 20 * i, 0, -115);
                ctx.rotate(deg1);
              }
              ctx.restore();
              ctx.save(); //分数段
              ctx.rotate(Math.PI / 2 + deg0);
              for (i = 0; i < 5; i++) {
                ctx.fillStyle = 'rgba(255, 255, 255, .4)';
                ctx.font = '10px Microsoft yahei';
                ctx.textAlign = 'center';
                ctx.fillText(stage[i], 5, -115);
                ctx.rotate(deg1);
              }
              ctx.restore();
              ctx.save(); //信用阶段及评估时间文字
              ctx.rotate(10 * deg0);
              ctx.fillStyle = '#fff';
              ctx.font = '12px Microsoft yahei';
              ctx.textAlign = 'center';
              ctx.restore();
              // ctx.save(); //最外层轨道
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
              ctx.lineWidth = 3;
              ctx.arc(0, 0, radius, 0, 11 * deg0, false);
              ctx.stroke();
              ctx.restore();

            })();
          }
          function Dot() {
            this.x = 0;
            this.y = 0;
            this.draw = function (ctx) {
              ctx.save();
              ctx.beginPath();
              ctx.fillStyle = 'rgba(255, 255, 255, .7)';
              ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
              ctx.fill();
              ctx.restore();
            };
          }

          function text(process) {
            ctx.save();
            ctx.rotate(10 * deg0);
            ctx.fillStyle = '#fff';
            ctx.font = '85px Microsoft yahei';
            ctx.textAlign = 'center';
            ctx.textBaseLine = 'top';
            ctx.fillText(process, 0 ,10);
            ctx.restore();

          };

          //综合评估
          let score_Text = ''
          if(res.data.score>=0 && res.data.score<=45){
            score_Text = '高危'
          }
          else if(res.data.score>=46 && res.data.score<=59){
            score_Text = '低危'
          }
          else if(res.data.score>=60 && res.data.score<=69){
            score_Text = '谨慎'
          }
          else if(res.data.score>=70 && res.data.score<=85){
            score_Text = '良好'
          }
          else if(res.data.score>=86 && res.data.score<=100){
            score_Text = '优秀'
          }
          this.setState({
            reportCode:res.data.reportCode,
            score:res.data.score,
            cheatResultCode:res.data.cheatResultCode,
            applyTime:formatDate(new Date(dateDiff(res.data.applyTime)),'yyyy-MM-dd'),
            lendingDetailsData:res.data.lendingDetailsData,
            loanDetailsData:res.data.loanDetailsData,
            overdueDetailsData:res.data.overdueDetailsData,
            lawDataList:res.data.lawDataList,
            name:formatName(res.data.userName),
            cheatEvaluation:res.data.cheatEvaluation,
            lendEvaluation:res.data.lendEvaluation,
            overdueEvaluation:res.data.overdueEvaluation,
            loanEvaluation:res.data.loanEvaluation,
            lawEvaluation:res.data.lawEvaluation,
            age:res.data.age,
            idCardNo:forIdCard(res.data.idCardNo),
            address:res.data.address,
            sexCode:res.data.sexCode,
            score_Text:score_Text,
          })
        })
        .catch(res=>{
          console.log(res.msg)

        })
    }
    else if(params.reportId){
      formData.append('reportId',params.reportId)
      fetch(reportUrl+'/getResultById',{
        method: 'POST',
        body:formData,
      })
        .then(res=>{
          return res.json()
        })
        .then(res =>{
          Taro.hideLoading()
          console.log(res,'12312312312321')
          if(res.code==0){
            Taro.redirectTo({
              url:'/pages/home/index'
            })
            Taro.showToast({
              title:'无记录',
              icon: 'none',
              duration: 3000
            })
          }
          //仪表图
          var canvas=document.getElementById('canvas');
          function getViewPort(){
            var viewHeight=window.innerHeight||document.documentElement.clientHeight;
            var viewWidth=window.innerWidth||document.documentElement.clientWidth;
            document.body.style.width=viewWidth;
            canvas.width=viewWidth;
            canvas.height=viewHeight;
          }

          getViewPort();
          var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            cWidth = canvas.width,
            cHeight = canvas.height,
            // score = canvas.attributes['data-score'].value,
            score = res.data.score,
            // stime = canvas.attributes['data-time'].value,
            stage = ['较差', '中等', '良好', '优秀', '极好'],
            radius = 150,
            deg0 = Math.PI / 9,
            deg1 = Math.PI * 11 / 45;

          if (score < 0 || score > 100) {
            alert('信用分数区间：0-100');
          } else {
            var dot = new Dot(),
              dotSpeed = 0.02, //0.03 3.07 //控制刻度比例
              textSpeed = Math.round(dotSpeed * 20 / deg1),
              angle = 0,
              credit = 0;
            (function drawFrame() {

              ctx.save();
              ctx.clearRect(0, 0, cWidth, cHeight);
              ctx.translate(cWidth / 2, cHeight / 2);
              ctx.rotate(8 * deg0);  //仪表盘转角度

              dot.x = radius * Math.cos(angle);
              dot.y = radius * Math.sin(angle);

              var aim = (score - 0) * deg1 / 20; //最外线
              if (angle < aim) {
                angle += dotSpeed;
              }
              dot.draw(ctx);
              if (credit < score - textSpeed) {
                credit += textSpeed;
              } else if (credit >= score - textSpeed && credit < score) {
                credit += 1;
              }
              text(credit);
              ctx.save();
              ctx.beginPath();
              ctx.lineWidth = 3;
              ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
              ctx.arc(0, 0, radius, 0, angle, false);
              ctx.stroke();
              ctx.restore();

              window.requestAnimationFrame(drawFrame);
              ctx.save(); //中间刻度层
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
              ctx.lineWidth = 10;
              ctx.arc(0, 0, 135, 0, 11 * deg0, false);
              ctx.stroke();
              ctx.restore();
              ctx.save(); // 刻度线
              for (var i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
                ctx.moveTo(140, 0);
                ctx.lineTo(130, 0);
                ctx.stroke();
                ctx.rotate(deg1);
              }
              ctx.restore();
              ctx.save(); // 细分刻度线
              for (i = 0; i < 25; i++) {
                if (i % 5 !== 0){
                  ctx.beginPath();
                  ctx.lineWidth = 2;
                  ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
                  ctx.moveTo(140, 0);
                  ctx.lineTo(133, 0);
                  ctx.stroke();
                }
                ctx.rotate(deg1 / 5);
              }
              ctx.restore();
              ctx.save(); //信用分数
              ctx.rotate(Math.PI / 2);
              for (i = 0; i < 6; i++) {
                ctx.fillStyle = 'rgba(255, 255, 255, .4)';
                ctx.font = '10px Microsoft yahei';
                ctx.textAlign = 'center';
                ctx.fillText(0 + 20 * i, 0, -115);
                ctx.rotate(deg1);
              }
              ctx.restore();
              ctx.save(); //分数段
              ctx.rotate(Math.PI / 2 + deg0);
              for (i = 0; i < 5; i++) {
                ctx.fillStyle = 'rgba(255, 255, 255, .4)';
                ctx.font = '10px Microsoft yahei';
                ctx.textAlign = 'center';
                ctx.fillText(stage[i], 5, -115);
                ctx.rotate(deg1);
              }
              ctx.restore();
              ctx.save(); //信用阶段及评估时间文字
              ctx.rotate(10 * deg0);
              ctx.fillStyle = '#fff';
              ctx.font = '12px Microsoft yahei';
              ctx.textAlign = 'center';
              ctx.restore();
              // ctx.save(); //最外层轨道
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(255, 255, 255, .4)';
              ctx.lineWidth = 3;
              ctx.arc(0, 0, radius, 0, 11 * deg0, false);
              ctx.stroke();
              ctx.restore();

            })();
          }
          function Dot() {
            this.x = 0;
            this.y = 0;
            this.draw = function (ctx) {
              ctx.save();
              ctx.beginPath();
              ctx.fillStyle = 'rgba(255, 255, 255, .7)';
              ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
              ctx.fill();
              ctx.restore();
            };
          }

          function text(process) {
            ctx.save();
            ctx.rotate(10 * deg0);
            ctx.fillStyle = '#fff';
            ctx.font = '85px Microsoft yahei';
            ctx.textAlign = 'center';
            ctx.textBaseLine = 'top';
            ctx.fillText(process, 0 ,10);
            ctx.restore();

          };

          //综合评估
          let score_Text = ''
          if(res.data.score>=0 && res.data.score<=45){
            score_Text = '高危'
          }
          else if(res.data.score>=46 && res.data.score<=59){
            score_Text = '低危'
          }
          else if(res.data.score>=60 && res.data.score<=69){
            score_Text = '谨慎'
          }
          else if(res.data.score>=70 && res.data.score<=85){
            score_Text = '良好'
          }
          else if(res.data.score>=86 && res.data.score<=100){
            score_Text = '优秀'
          }
          this.setState({
            reportCode:res.data.reportCode,
            score:res.data.score,
            cheatResultCode:res.data.cheatResultCode,
            applyTime:formatDate(new Date(dateDiff(res.data.applyTime)),'yyyy-MM-dd'),
            lendingDetailsData:res.data.lendingDetailsData,
            loanDetailsData:res.data.loanDetailsData,
            overdueDetailsData:res.data.overdueDetailsData,
            lawDataList:res.data.lawDataList,
            cheatEvaluation:res.data.cheatEvaluation,
            loanEvaluation:res.data.loanEvaluation,
            overdueEvaluation:res.data.overdueEvaluation,
            name:formatName(res.data.userName),
            age:res.data.age,
            idCardNo:forIdCard(res.data.idCardNo),
            address:res.data.address,
            sexCode:res.data.sexCode,
            score_Text:score_Text,
          })
        })
        .catch(res=>{
          console.log(res.msg)

        })
    }
    // else {
    //   Taro.redirectTo({
    //     url:'/'
    //   })
    // }
    // formData.append('userName','李豫');
    // formData.append('phone', '15167790992');
    // formData.append('idCardNo', '420603197909252018');


}
  render(){
    const {score_Text,name,age,sexCode,reportCode,score,cheatResultCode,idCardNo,address,applyTime,lawDataList,
      lendingDetailsData,loanDetailsData,overdueDetailsData,lawEvaluation,
      overdueEvaluation,
      loanEvaluation,
      lendEvaluation,} = this.state
     console.log(loanDetailsData.loanApplyDays)
    return (
      <View className='container'>
        <View className='container_canvas'>
          <Canvas canvasId='canvas'></Canvas>
          {/*<canvas id='canvas'></canvas>*/}
          <View className='report_number'>
            <View >报告编号：{reportCode}
            </View>
            {/*<Button className='btn' data-clipboard-text='btnCopy'>复制</Button>*/}
            <View>请保存，已便下次查看</View>
          </View>
          <View className='scale_examine'>
            <View className='com'>
              综合评分：{score}分
            </View>
            <View className='com_dec'>
              综合评估{score_Text}。<Text className='prop' >{score&&score>60?'建议通过':'建议不通过'}</Text> 评分越低，风险越高
            </View>
          </View>
          <View className='risk_mark table_series'>
            <table className='table_risk series'>
              <caption className='mark'>重点风险标注</caption>
              <thead>
              <tr>
                <th>命中黑名单
                  <View className='result'>
                    {cheatResultCode&&cheatResultCode!="01"?'否':'是'}
                  </View>
                </th>
                <th>涉发院案件
                  <View className='result'>
                    {lawDataList&&lawDataList.length>0?'是':'否'}
                  </View>
                </th>
                <th>12个月网贷申请
                  <View className='result'>
                    {/*{loanDetailsData.apply_mechanism_number!=0?'是':'否'}*/}
                    {loanDetailsData&&loanDetailsData.apply_mechanism_number>0?loanDetailsData.apply_mechanism_number:0}
                  </View>
                </th>
                <th>6个月网贷放款
                  <View className='result'>
                    {/*{lendingDetailsData.lend_number6!=0?'是':'否'}*/}
                    {lendingDetailsData&&lendingDetailsData.lend_number6>0?lendingDetailsData.lend_number6:0}
                  </View>
                </th>
                <th>6个月网贷逾期
                  <View className='result'>
                    {/*{overdueDetailsData.counts!=0?'是':'否'}*/}
                    {overdueDetailsData&&overdueDetailsData.counts>0?overdueDetailsData.counts:0}
                  </View>
                </th>
              </tr>
              </thead>
            </table>
          </View>
          <View className='degree_mark table_series'>
            <table className='table_degree series'>
              <thead>
              <tr>
                <th>高危
                  <View className='result'>
                    0-45
                  </View>
                </th>
                <th>低危
                  <View className='result'>
                    46-59
                  </View>
                </th>
                <th>谨慎
                  <View className='result'>
                    60-69
                  </View>
                </th>
                <th>良好
                  <View className='result'>
                    70-85
                  </View>
                </th>
                <th>优秀
                  <View className='result'>
                    86-10
                  </View>
                </th>
              </tr>
              </thead>
            </table>
          </View>
          <View className='Tips'>
            洞察报告是根据人群网络数据出具的面向社会的综合报告，本报告非征信报告，评分仅供参考
          </View>
        </View>
        {/*基本信息*/}
        <View className='essential_inf'>
          <View className='title'>
            <Image className='bg_mark' src={Inf} />
          </View>
          <View className='con_100'>
            <View className='inf_iden w_m'>
              <Image className='img_mark' src={IdMark} />
              <View className='iden'>
                  <View className='per_inf'>
                    <View className='name'>
                      {name&&name}
                    </View>
                    <View className='age_pro'>
                      {age&&age}岁{sexCode!=0?'女性':'男性'}
                      <View>{address&&address}</View>
                    </View>
                  </View>
                <View className='id_num'>
                  <View className='img'>
                    <Image className='id'  src={IdCard} />
                  </View>
                  <View className='num'>{idCardNo&&idCardNo}</View>
                </View>
                <View className='re_num'>
                  <View className='img'>
                    <Image className='re'  src={Re_Num} />
                  </View>
                  <View className='num'>{reportCode&&reportCode}</View>
                </View>
                <View className='re_time'>
                  报告生成时间：{applyTime&&applyTime}
                </View>
              </View>
            </View>
              {/*黑名单查询*/}
            <View className='black_list con_100'>
              <Image className='title_img' src={BlackList} />
              <View className='w_m'>
                <View className='text'>
                  <View>是否为行业黑名单：</View>
                  <View className='judge'>{cheatResultCode&&cheatResultCode!="01"?'否':'是'}</View>
                </View>
              </View>
            </View>
            <View className='credit_apply  credit'>
              <Image className='title_img' src={Credit} />
              <View className='credit_mark table_series'>
                <table className='table_credit series'>
                  <thead>
                  <tr>
                    <th>查询状态</th>
                    <th>{loanDetailsData&&loanDetailsData.type!="Y"?'未查得':'查得'}</th>
                    <th>风险等级</th>
                    <th>{loanEvaluation&&loanEvaluation}</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>最近一次申请日期</td>
                      <td>{loanDetailsData&&loanDetailsData.last_apply_time}</td>
                      <td>距离最近一次申请已有</td>
                      <td>{loanDetailsData&&loanDetailsData.loanApplyDays}</td>
                    </tr>
                    <tr>
                      <td>近12个月申请机构总数</td>
                      <td>{loanDetailsData&&loanDetailsData.apply_mechanism_number}</td>
                      <td>近12个月消费金融类申请机构数</td>
                      <td>{loanDetailsData&&loanDetailsData.consumer_apply_mechanism_number}</td>
                    </tr>
                    <tr>
                      <td>近12个月网络贷款类申请机构数</td>
                      <td>{loanDetailsData&&loanDetailsData.apply_mechanism_number}</td>
                    </tr>
                  </tbody>
                </table>
                <table className='table_credit series frequency'>
                  <thead>
                  <tr>
                    <th>申请次数（次）</th>
                    <th>近一个月</th>
                    <th>近3个月</th>
                    <th>近6个月</th>
                    <th>近12个月</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className='td_cos' colspan="2">{loanDetailsData&&loanDetailsData.apply_time1}</td>
                    <td>{loanDetailsData&&loanDetailsData.apply_time3}</td>
                    <td>{loanDetailsData&&loanDetailsData.apply_time6}</td>
                    <td>{loanDetailsData&&loanDetailsData.apply_time12}</td>
                  </tr>
                  </tbody>
                </table>
              </View>
            </View>
            <View className='credit_loan credit '>
              <Image className='title_img' src={CreditLoan} />
              <View className='credit_mark table_series'>
                <table className='table_credit series'>
                  <thead>
                  <tr>
                    <th>查询状态</th>
                    <th>{lendingDetailsData&&lendingDetailsData.type!="Y"?'未查得':'查得'}</th>
                    <th>风险等级</th>
                    <th>{lendEvaluation&&lendEvaluation}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>最近一次申请日期</td>
                    <td></td>
                    <td>距离最近一次申请已有</td>
                    <td>{lendingDetailsData&&lendingDetailsData.lendApplyDays}</td>
                  </tr>
                  <tr>
                    <td>近12个月放款机构总数</td>
                    <td>{lendingDetailsData&&lendingDetailsData.lenders}</td>
                    <td>近12个月消费金融类放款机构数</td>
                    <td>{lendingDetailsData&&lendingDetailsData.cflenders}</td>
                  </tr>
                  <tr>
                    <td>近12个月网络贷款类放款机构数</td>
                    <td></td>
                    {lendingDetailsData&&lendingDetailsData.loanApplyDays}
                  </tr>
                  </tbody>
                </table>
                <table className='table_credit series frequency'>
                  <thead>
                  <tr>
                    <th>放款次数（次）</th>
                    <th>近一个月</th>
                    <th>近3个月</th>
                    <th>近6个月</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className='td_cos' colspan="2">{lendingDetailsData&&lendingDetailsData.lend_number1}</td>
                    <td>{lendingDetailsData&&lendingDetailsData.lend_number3}</td>
                    <td>{lendingDetailsData&&lendingDetailsData.lend_number6}</td>
                  </tr>
                  </tbody>
                </table>
              </View>
            </View>
            <View className='credit_overdue credit '>
              <Image className='title_img' src={Overdue} />
              <View className='credit_mark table_series'>
                <table className='table_credit series'>
                  <thead>
                  <tr>
                    <th>查询状态</th>
                    <th>{overdueDetailsData&&overdueDetailsData.type!="Y"?'未查得':'查得'}</th>
                    <th>风险等级</th>
                    <th>{overdueEvaluation&&overdueEvaluation}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>近6个月逾期机构总数</td>
                    <td>{overdueDetailsData&&overdueDetailsData.overdue_mechanism_number}</td>
                    <td>近六个月逾期总次数</td>
                    <td>{overdueDetailsData&&overdueDetailsData.counts}</td>
                  </tr>
                  <tr>
                    <td>近6个月未结算逾期次数</td>
                    <td>{overdueDetailsData&&overdueDetailsData.debtCount}</td>
                    <td>近6个月逾期总金额(元)</td>
                    <td>{overdueDetailsData&&overdueDetailsData.overdue_money}</td>
                  </tr>
                  </tbody>
                </table>
                <table className='table_credit series frequency'>
                  <thead>
                  <tr>
                    <th>序号</th>
                    <th>逾期金额区间(元)</th>
                    <th>逾期时间</th>
                    <th>逾期时长</th>
                    <th>近6个月</th>
                  </tr>
                  </thead>
                  <tbody>
                    {overdueDetailsData&&overdueDetailsData.datalist&&overdueDetailsData.datalist.map((item,index)=>(
                      <tr>
                        <td>{index+1}</td>
                        <td>{item.overdue_money}</td>
                        <td>{item.overdue_time}</td>
                        <td>{item.overdue_day}</td>
                        <td>{item.settlement!="Y"?'是':'否'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </View>
            </View>
            <View className='credit_law credit '>
              <Image className='title_img' src={LawInf} />
              <View className='credit_mark table_series'>
                <table className='table_credit series'>
                  <thead>
                  <tr>
                    <th>命中次数</th>
                    <th>{lawDataList&&lawDataList.length}</th>
                    <th>风险等级</th>
                    <th>{lawEvaluation&&lawEvaluation}</th>
                  </tr>
                  </thead>
                </table>
                <table className='table_credit series frequency'>
                  <thead className='law_tb'>
                  <tr>
                    <th>序号</th>
                    <th>审核日期</th>
                    <th>类型</th>
                    <th>摘要说明</th>
                  </tr>
                  </thead>
                  <tbody>
                      {lawDataList&&lawDataList.map((item,index)=>(
                        <tr>
                          <td>{index+1}</td>
                          <td>{item.sort_time_string}</td>
                          <td>
                            {item.data_type == "judgment"?'裁判文书':null}
                            {item.data_type == "dishonest_notice"?'失信公告':null}
                            {item.data_type == "court_session_notice"?"开庭公告":null}
                            {item.data_type == "court_notice"?"法院公告":null}
                            {item.data_type == "exec_notice"?"执行公告":null}
                            {item.data_type == "exposure"?"曝光台":null}
                            {item.data_type == "law_case"?"案件流程信息":null}
                          </td>
                          <td>{item.content}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </View>
            </View>
          </View>
        </View>
        <View className='footer '>
          <View>
            布尔数据提供技术支持
          </View>
          <View>
            阿里云提供存储服务
          </View>
        </View>
      </View>
    )
  }
}

export default Inc
