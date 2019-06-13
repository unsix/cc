import Taro, { Component } from '@tarojs/taro';
import { View,Text,Image,Canvas} from '@tarojs/components';
import './index.scss'
import { connect } from '@tarojs/redux'
//img
import Inf from '../../../images/report/essential_inf.jpg'
import IdCard from  '../../../images/report/id_report.png'
import IdMark from  '../../../images/report/id_mark.png'
import Re_Num from  '../../../images/report/report_number.png'
import BlackList from  '../../../images/report/blacklist.png'
import Credit from  '../../../images/report/credit.png'
import CreditLoan from  '../../../images/report/credit_loan.png'
import Overdue from  '../../../images/report/overdue_risk.png'
import LawInf from  '../../../images/report/law_inf.png'
import Report from '../../../images/report/reportResult.png'
import BackHome from  '../../../images/report/backHome.png'
@connect(({ reportHome}) => ({
  ...reportHome,
}))

class  Inc extends Component{
  config = {
    navigationBarTitleText: '报告结果',
  };
  componentDidMount () {
    let params = this.$router.params
    if(params.tradeNo){
      this.props.dispatch({
        type:'reportHome/getResult',
        payload:{
          tradeNo:params
        }
      })
    }

    else if (params.reportId){
      this.props.dispatch({
        type:'reportHome/getResultById',
        payload:{
          reportId:params
        }
      })
    }
  }
  backHome =()=>{
    Taro.switchTab({ url: '/pages/home/index' })
  }
  render(){
    const {score_Text,age,sexCode,reportCode,score,cheatResultCode,address,applyTime,lawDataList,
      lendingDetailsData,loanDetailsData,overdueDetailsData,lawEvaluation,
      pass,
      overdueEvaluation,
      loanEvaluation,
      lendEvaluation,} = this.props.details
    const {name,idCardNo} =this.props
    return (
      <View className='container'>
        <View className='container_canvas'>
          {/*<canvas id="canvas" data-score='80' data-time='2018.06.01'></canvas>*/}
          {/*<Canvas width={200} height={150} canvasId='canvas'*/}
          {/*        />*/}
          <Canvas width={400} height={350} canvasId='canvas'>

          </Canvas>
          <View className='report_number'>
            <View className='number_l'>
              <View>报告编号：{reportCode&&reportCode}</View>
              <View>布尔数据提供技术支持</View>
            </View>
            <View className='number_r'>
              <View>请保存截图，已便下次查看</View>
              <View>阿里云提供存储服务</View>
            </View>
          </View>
          <View className='scale_examine'>
            <View className='report_img'>
              <Image className='img' src={Report} />
            </View>
            <View className='score'>
              {score}
            </View>
            <View className='com'>
              综合评分：{score}分
            </View>
            <View className='com_dec'>
              综合评估{score_Text}。<Text className='prop' >{pass===true?'建议通过':'建议不通过'};</Text> 评分越低，风险越高
            </View>
          </View>
          <View className='risk_mark table_series'>
            <View className='table_risk series'>
              <View className='mark'>重点风险标注</View>
              <View className='risk_sort'>
                <View className='risk_b'>命中黑名单
                  <View className='result'>
                    {cheatResultCode&&cheatResultCode!="01"?'否':'是'}
                  </View>
                </View>
                <View className='risk_b'> 涉法院案件
                  <View className='result'>
                    {lawDataList&&lawDataList.length>0?'是':'否'}
                  </View>
                </View>
                <View className='risk_b risk_c'>12个月网贷申请
                  <View className='result '>
                    {loanDetailsData&&loanDetailsData.apply_mechanism_number>0?loanDetailsData.apply_mechanism_number:0}
                  </View>
                </View>
                <View className='risk_b  risk_c'>6个月网贷放款
                  <View className='result '>
                    {lendingDetailsData&&lendingDetailsData.lend_number6>0?lendingDetailsData.lend_number6:0}
                  </View>
                </View>
                <View className='risk_b risk_c'>6个月网贷逾期
                  <View className='result '>
                    {overdueDetailsData&&overdueDetailsData.counts>0?overdueDetailsData.counts:0}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='degree_mark table_series'>
            <View className='table_degree series'>
              <View className="table_view">
              <View className='risk_sort'>
                <View  className='risk_b'>高危
                  <View className='result'>
                    0-45
                  </View>
                </View>
                <View className='risk_b'>低危
                  <View className='result'>
                    46-59
                  </View>
                </View>
                <View className='risk_b'>谨慎
                  <View className='result'>
                    60-69
                  </View>
                </View>
                <View className='risk_b'>良好
                  <View className='result'>
                    70-85
                  </View>
                </View>
                <View className='risk_b'>优秀
                  <View className='result'>
                    86-10
                  </View>
                </View>
              </View>
              </View>
            </View>
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
                <View className='re_time'>{applyTime&&applyTime}</View>
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
                <View className='table_credit series'>
                  <View className='table_view'>
                  <View className='table_text'>
                    <View className='text'>查询状态</View >
                    <View className='text'>{loanDetailsData&&loanDetailsData.type!="Y"?'未查得':'查得'}</View >
                    <View className='text'>风险等级</View >
                    <View className='text'>{loanEvaluation&&loanEvaluation}</View >
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'>最近一次申请日期</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.last_apply_time}</View>
                    <View className='text'>距离最近一次申请已有</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.loanApplyDays}</View>
                  </View >
                  <View className='table_text'>
                    <View className='text'>近12个月申请机构总数</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.apply_mechanism_number}</View>
                    <View className='text'>近12个月消费金融类申请机构数</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.consumer_apply_mechanism_number}</View>
                  </View>
                  <View className='table_text'>
                    <View className='text'>近12个月网络贷款类申请机构数</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.apply_mechanism_number}</View>
                    <View className='text'></View>
                    <View className='text'></View>
                  </View>
                  </View>
                </View>
                <View className='table_credit series frequency'>
                  <View className='table_view'>
                  <View className='table_text'>
                    <View className='text'>申请次数（次）</View>
                    <View className='text'>近一个月</View>
                    <View className='text'>近3个月</View>
                    <View className='text'>近6个月</View>
                    <View className='text'>近12个月</View>
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'></View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.apply_time1}</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.apply_time3}</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.apply_time6}</View>
                    <View className='text'>{loanDetailsData&&loanDetailsData.apply_time12}</View>
                  </View>
                  </View>
                </View>
              </View>
            </View>
            <View className='credit_loan credit '>
              <Image className='title_img' src={CreditLoan} />
              <View className='credit_mark table_series'>
                <View className='table_credit series'>
                  <View className='table_view'>
                  <View className='table_text'>
                    <View className='text'>查询状态</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.type!="Y"?'未查得':'查得'}</View>
                    <View className='text'>风险等级</View>
                    <View className='text'>{lendEvaluation&&lendEvaluation}</View>
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'>最近一次申请日期</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.lend_time}</View>
                    <View className='text'>距离最近一次申请已有</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.lendApplyDays}</View>
                  </View>
                  <View className='table_text'>
                    <View className='text'>近12个月放款机构总数</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.lenders}</View>
                    <View className='text'>近12个月消费金融类放款机构数</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.cflenders}</View>
                  </View>
                  <View className='table_text'>
                    <td className='text'>近12个月网络贷款类放款机构数</td>
                    <td className='text'>{lendingDetailsData&&lendingDetailsData.loanApplyDays}</td>
                    <View className='text'></View>
                    <View className='text'></View>
                  </View>
                  </View>
                </View>
                <View className='table_credit series frequency'>
                  <View className='table_view'>
                  <View className='table_text'>
                    <View className='text'>放款次数（次）</View>
                    <View className='text'>近一个月</View>
                    <View className='text'>近3个月</View>
                    <View className='text'>近6个月</View>
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'></View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.lend_number1}</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.lend_number3}</View>
                    <View className='text'>{lendingDetailsData&&lendingDetailsData.lend_number6}</View>
                  </View>
                  </View>
                </View>
              </View>
            </View>
            <View className='credit_overdue credit '>
              <Image className='title_img' src={Overdue} />
              <View className='credit_mark table_series'>
                <View className='table_credit series'>
                  <View className='table_view'>
                  <View className='table_text'>
                    <View className='text'>查询状态</View>
                    <View className='text'>{overdueDetailsData&&overdueDetailsData.type!="Y"?'未查得':'查得'}</View>
                    <View className='text'>风险等级</View>
                    <View className='text'>{overdueEvaluation&&overdueEvaluation}</View>
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'>近6个月逾期机构总数</View>
                    <View className='text'>{overdueDetailsData&&overdueDetailsData.overdue_mechanism_number}</View>
                    <View className='text'>近六个月逾期总次数</View>
                    <View className='text'>{overdueDetailsData&&overdueDetailsData.counts}</View>
                  </View>
                  <View className='table_text'>
                    <View className='text'>近6个月未结算逾期次数</View>
                    <View className='text'>{overdueDetailsData&&overdueDetailsData.debtCount}</View>
                    <View className='text'>近6个月逾期总金额(元)</View>
                    <View className='text'>{overdueDetailsData&&overdueDetailsData.overdue_money}</View>
                  </View>
                  </View>
                </View>
                <View className='table_credit series frequency'>
                  <View className='table_view'>
                  <View className='table_text'>
                    <View className='text'>序号</View>
                    <View className='text'>逾期金额区间(元)</View>
                    <View className='text'>逾期时间</View>
                    <View className='text'>逾期时长</View>
                    <View className='text'>近6个月</View>
                  </View>
                  </View>
                  <View>
                  {overdueDetailsData&&overdueDetailsData.datalist&&overdueDetailsData.datalist.map((item,index)=>(
                    <View className='table_text'>
                      <View className='text'>{index+1}</View>
                      <View className='text'>{item.overdue_money}</View>
                      <View className='text'>{item.overdue_time}</View>
                      <View className='text'>{item.overdue_day}</View>
                      <View className='text'>{item.settlement!="Y"?'是':'否'}</View>
                    </View>
                  ))}
                  </View>
                </View>
              </View>
            </View>
            <View className='credit_law credit '>
              <Image className='title_img' src={LawInf} />
              <View className='credit_mark table_series'>
                <View className='table_credit series'>
                  <View className="table_view">
                  <View className='table_text'>
                    <View className='text'>命中次数</View>
                    <View className='text'>{lawDataList&&lawDataList.length}</View>
                    <View className='text'>风险等级</View>
                    <View className='text'>{lawEvaluation&&lawEvaluation}</View>
                  </View>
                  </View>
                </View>
                <View className='table_credit series frequency'>
                  <View className='law_tb'>
                  <View className='table_text'>
                    <View className='text'>序号</View>
                    <View className='text'>审核日期</View>
                    <View className='text'>类型</View>
                    <View className='text'>摘要说明</View>
                  </View>
                  </View>
                  <View>
                  {lawDataList&&lawDataList.map((item,index)=>(
                    <View className='table_text'>
                      <View className='text'>{index+1}</View>
                      <View className='text'>{item.sort_time_string}</View>
                      <View className='text'>
                        {item.data_type == "judgment"?'裁判文书':null}
                        {item.data_type == "dishonest_notice"?'失信公告':null}
                        {item.data_type == "court_session_notice"?"开庭公告":null}
                        {item.data_type == "court_notice"?"法院公告":null}
                        {item.data_type == "exec_notice"?"执行公告":null}
                        {item.data_type == "exposure"?"曝光台":null}
                        {item.data_type == "law_case"?"案件流程信息":null}</View>
                      <View className='text'>
                        {item.content}
                      </View>
                    </View>
                  ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='footer '>

        </View>
        <View className='back'>
          <Image className='img' onClick={this.backHome} src={BackHome} />
        </View>
      </View>
    )
  }
}

export default Inc
