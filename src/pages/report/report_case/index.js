import Taro, { Component } from '@tarojs/taro';
import { View,Text,Image} from '@tarojs/components';
import '../report_results/index.scss'

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

class  Inc extends Component{

  render(){
    return (
      <View className='container'>
        <View className='container_canvas'>
          {/*<canvas id="canvas" data-score='80' data-time='2018.06.01'></canvas>*/}
          <View className='report_number'>
            <View className='number_l'>
              <View>报告编号：XS0000001</View>
              <View>布尔数据提供技术支持</View>
            </View>
            <View className='number_r'>
              <View>请保存，已便下次查看</View>
              <View>阿里云提供存储服务</View>
            </View>
          </View>
          <View className='scale_examine'>
            <View className='com'>
              综合评分：36分
            </View>
            <View className='com_dec'>
              综合评估高危。<Text className='prop' >建议不通过；</Text> 评分越低，风险越高
            </View>
          </View>
          <View className='risk_mark table_series'>
            <View className='table_risk series'>
              <View className='mark'>重点风险标注</View>
              <View className='table_view'>
              <View className='risk_sort'>
                <View className='risk_b'>命中黑名单
                  <View className='result'>
                    否
                  </View>
                </View>
                <View className='risk_b'> 涉发院案件
                  <View className='result'>
                    是
                  </View>
                </View>
                <View className='risk_b'>12个月网贷申请
                  <View className='result'>
                    19
                  </View>
                </View>
                <View className='risk_b'>6个月网贷放款
                  <View className='result'>
                    17
                  </View>
                </View>
                <View className='risk_b'>6个月网贷逾期
                  <View className='result'>
                    1
                  </View>
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
                    钱**
                  </View>
                  <View className='age_pro'>
                    28岁女性
                    <View>浙江省杭州市</View>
                  </View>
                </View>
                <View className='id_num'>
                  <View className='img'>
                    <Image className='id'  src={IdCard} />
                  </View>
                  <View className='num'>3225*******1212</View>
                </View>
                <View className='re_num'>
                  <View className='img'>
                    <Image className='re'  src={Re_Num} />
                  </View>
                  <View className='num'>XS0000001</View>
                </View>
                <View className='re_time'>报告生成时间 2019-04-27</View>
              </View>
            </View>
            {/*黑名单查询*/}
            <View className='black_list con_100'>
              <Image className='title_img' src={BlackList} />
              <View className='w_m'>
                <View className='text'>
                  <View>是否为行业黑名单：</View>
                  <View className='judge'>否</View>
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
                    <View className='text'>查得</View >
                    <View className='text'>风险等级</View >
                    <View className='text'>高</View >
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'>最近一次申请日期</View>
                    <View className='text'>2019-02-24</View>
                    <View className='text'>距离最近一次申请已有</View>
                    <View className='text'>25天</View>
                  </View >
                  <View className='table_text'>
                    <View className='text'>近12个月申请机构总数</View>
                    <View className='text'>19</View>
                    <View className='text'>消费分期类申请机构数</View>
                    <View className='text'>5</View>
                  </View>
                  <View className='table_text'>
                    <View className='text'>机构贷款类申请机构数</View>
                    <View className='text'>3</View>
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
                    <View className='text'>5</View>
                    <View className='text'>11</View>
                    <View className='text'>17</View>
                    <View className='text'>33</View>
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
                    <View className='text'>查得</View>
                    <View className='text'>风险等级</View>
                    <View className='text'>高</View>
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'>最近一次申请日期</View>
                    <View className='text'>2019-02-24</View>
                    <View className='text'>距离最近一次申请已有</View>
                    <View className='text'>25天</View>
                  </View>
                  <View className='table_text'>
                    <View className='text'>近12个月放款机构总数</View>
                    <View className='text'>19</View>
                    <View className='text'>消费分期类申请机构数</View>
                    <View className='text'>5</View>
                  </View>
                  <View className='table_text'>
                    <td className='text'>机构贷款类申请机构数</td>
                    <td className='text'>3</td>
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
                    <View className='text'>5</View>
                    <View className='text'>11</View>
                    <View className='text'>17</View>
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
                    <View className='text'>查得</View>
                    <View className='text'>风险等级</View>
                    <View className='text'>高</View>
                  </View>
                  </View>
                  <View>
                  <View className='table_text'>
                    <View className='text'>近6个月逾期机构总数</View>
                    <View className='text'>1</View>
                    <View className='text'>近六个月逾期总次数</View>
                    <View className='text'>1</View>
                  </View>
                  <View className='table_text'>
                    <View className='text'>近6个月未结算逾期次数</View>
                    <View className='text'>1</View>
                    <View className='text'>近6个月逾期总金额(元)</View>
                    <View className='text'>3400</View>
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
                  <View className='table_text'>
                    <View className='text'>1</View>
                    <View className='text'>3000-4000</View>
                    <View className='text'>2019-03</View>
                    <View className='text'>MO</View>
                    <View className='text'>是</View>
                  </View>
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
                    <View className='text'>1</View>
                    <View className='text'>风险等级</View>
                    <View className='text'>高</View>
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
                  <View className='table_text'>
                    <View className='text'>1</View>
                    <View className='text'>2017-03-31</View>
                    <View className='text'>裁判文书</View>
                    <View className='text'>
                      法院：上海市浦东新区人民法院
                      法案案号：(2017)泸0115民初***9号
                    </View>
                  </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='footer '>

        </View>
      </View>
    )
  }
}

export default Inc
