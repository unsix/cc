import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({ serviceProtocol }) => ({
  ...serviceProtocol,
}))
class Serviceprotocol extends Component {
  config = {
    navigationBarTitleText: '服务协议',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className='serviceProtocol-page'>
        <View className='at-article'>
          <View className='at-article__h1'>
            刺猬优租机租赁服务协议
          </View>
          <View className='at-article__p'>
            甲方（商家）：
          </View>
          <View className='at-article__p'>
            乙方（租户）：
          </View>
          <View className='at-article__p'>
            甲方、乙方及刺猬优租机平台关系说明：【甲方】指的是通过刺猬优租机平台入驻成为刺猬优租机平台的商家，自愿签署《刺猬优租机租赁服务协议》，且已阅览并同意本协议所有条款，认可本协议的法律效力。【乙方】乙方指的是通过刺猬优租机平台下单租用甲方商品的租户。乙方有权选择是否签署《刺猬优租机租赁服务协议》。乙方在刺猬优租
            机平台下单支付后，即代表阅览并同意本协议所有条款，认可本协议的法律效力。
          </View>
          <View className='at-article__p'>
            甲方依据本《刺猬优租机租赁服务协议》（“本协议”）的约定通过刺猬优租机（“平台”）为乙方提供租赁服务，请乙方务必审慎阅读本协议，乙方下单支付后，即视为乙方已经充分阅读并接受本协议全部条款，本协议立即生效且具有法律效力。
          </View>
          <View className='at-article__h3'>第一条 关于设备</View>
          <View className='at-article__p'>
            1.1 平台的设备由符合甲方向乙方提供，双方一致确认刺猬优租机平台注册地为合同履行地。
          </View>
          <View className='at-article__p'>
            1.2 设备的详细信息，包括品牌、型号、配置、租金单价、总价、租期、成色等，以下单页面为准。
          </View>
          <View className='at-article__p'>
            1.3 乙方在租用设备下单前应当向平台及商家提供自己的身份证原件扫描件并通过人脸识别系统确认，同时还应当提供租赁设备准确的邮寄送达地址及联系方式（包括但不限于手机号码、微信号、QQ及邮箱等）。乙方提供的身份证地址与邮寄送达地址不一致的，以乙方确认的下单页或发货时确认的邮寄送达地址为准。在租赁期限内，乙方地址及联系方式变更时应及时通知甲方和商家，否则由此导致租赁设备无法送达或丢失、电话信息失联等一切损失均由乙方承担。
          </View>
          <View className='at-article__p'>
            1.4 乙方在租用设备过程中，需确保设备完好，未经商家同意，不得私自拆卸、私自升级系统或软件服务，否则视为违约。
          </View>
          <View className='at-article__h3'>第二条 租金和押金</View>
          <View className='at-article__p'>
            2.1 产品租金及押金由甲方自主确定，租户在下单时，由平台代收相应租金、押金。
          </View>
          <View className='at-article__p'>
            2.2 平台根据租户信用资质授予免押金额度，设备押金在免押金额度范围内的，不需要支付押金，超出部分，应支付押金；甲乙双方未确认发货前，甲方有权决定变更减免押金的额度，且须经过甲乙双方同意订单才生效。租赁期限届满，租户应及时将设备归还商家，商家在收到设备后经检测确认无损坏的，应当在3个工作日退还押金，节假日顺延。 租户在租赁期限届满后未及时归还设备的，商家有权继续按协议约定标准收取租金；租户逾期归还设备超过15天的，甲方可以要求乙方买断商品，并且有权直接向平台申请扣除租户全部押金。
          </View>
          <View className='at-article__p'>
            2.3 甲方产品租金分期收取，租期30天内的为1期订单，租期超过30天的为多期订单。乙方提交订单时需支付至少一期租金。签约代扣的，平台在下一个交租周期自动从乙方支付账户中扣除下一期租金，乙方应保证在租金付款日账户中有足够金额；未签约代扣的，用户需在分期账单的付款日前完成分期账单的支付。
          </View>
          <View className='at-article__p'>
            2.4 乙方应当按时足额支付租金，否则，甲方有权提前终止本协议，收回租赁商品，并要求租户付清所欠的租金并加收租金总额30 % 的违约金。
          </View>
          <View className='at-article__p'>
            2.5租期期间正常商品折旧，商品自然产生的故障由商家免费更换，软件问题由商家协助。因人为损坏，拆解，划痕等问题导致维修的，租户应承担配件成本和维修费用，维修期间的租期费用继续计算。如设备无法修复或修复价格远远超过商品本身价值或商品丢失的，租户应当买断商品。
          </View>
          <View className='at-article__p'>
            2.6设备使用过程中因软件造成设备不能使用的问题不包含在租赁服务中，但可要求商家尽力协助解决。
          </View>
          <View className='at-article__h3'>第三条 关于订单取消、租期计算和提前归还</View>
          <View className='at-article__p'>
            3.1 发货后非商品质量问题，恕不退货。
          </View>
          <View className='at-article__p'>
            3.2 租期自乙方收到商品当天起算至乙方将商品归还商家并检测合格之日止。
          </View>
          <View className='at-article__p'>
            3.3 除非商家设备介绍页面约定可随借随还，否则租户不能提前归还；若乙方仍要提前归还，应与甲方提前沟通并且获得甲方同意，否则甲方有权按原租期计算租金，已交租金不退。
          </View>
          <View className='at-article__h3'>第四条 续租</View>
          <View className='at-article__p'>
            4.1 租赁期限届满后，租户需要续租的，可以申请续租即在“我的订单”找到符合条件的商品订单，点击续租按钮进行续租下单，续租订单的租金和押金以续租下单页面为准。
          </View>
          <View className='at-article__h3'>第五条 支付方式</View>
          <View className='at-article__p'>
            5.1 平台提供支付宝、信用卡、芝麻信用授权等支付方式。
          </View>
          <View className='at-article__h3'>第六条 订单审核</View>
          <View className='at-article__p'>
            6.1 订单支付成功后，平台对租户订单信息进行评估，若平台判定租户风险系数较高，平台有权让租户补交押金或授权，订单未补交押金或担保物的，将直接关闭，已经支付的款项原路退还租户。
          </View>
          <View className='at-article__h3'>第七条 发票开取</View>
          <View className='at-article__p'>
            7.1 发票由甲方提供，乙方需开取发票的，下单后应与甲方沟通，并将开具发票的资料信息准确提供给甲方。开票内容可为“租赁服务费”，类型可以为增值税普通发票或增值税专用票，具体以甲乙双方沟通确定为准。
          </View>
          <View className='at-article__h3'>第八条 平台及甲方的权利与义务</View>
          <View className='at-article__p'>
            8.1 甲方在租赁期间拥有租赁商品的所有权。
          </View>
          <View className='at-article__p'>
            8.2 甲方有权按租赁协议收取租金。
          </View>
          <View className='at-article__p'>
            8.3 平台有权对乙方提交申请租赁的信用信息有知情权并可合法使用该信息进行风控评估，平台承诺不泄露乙方在平台留存的资料信息。
          </View>
          <View className='at-article__p'>
            8.4 甲方应当对商品的自然故障提供更换或维修的服务。
          </View>
          <View className='at-article__p'>
            8.5 甲方应当向乙方交付质量正常的商品，保证商品配置和乙方在订单中标明的一致。
          </View>
          <View className='at-article__p'>
            8.6 甲方负责乙方归还商品检测并有权在乙方违约时进行追偿。
          </View>
          <View className='at-article__p'>
            8.7 当乙方逾期不缴纳租金时，甲方有权收回租赁商品、终止履行协议并要求乙方承担相应的违约责任。
          </View>
          <View className='at-article__p'>
            8.8 平台和甲方不承担由乙方使用租赁商品引发的任何连带责任，包括但不限于各种人身伤害、财产损失、影响商誉，以及其他对第三方造成的损失。
          </View>
          <View className='at-article__p'>
            8.9 平台有权对甲方服务具有监督的义务，并及时处理租户的投诉。
          </View>
          <View className='at-article__h3'>第九条 乙方权利与义务</View>
          <View className='at-article__p'>
            9.1 在租赁期间拥有租赁商品的合法使用权。
          </View>
          <View className='at-article__p'>
            9.2 按租赁协议之约定按时、足额向甲方支付租金。
          </View>
          <View className='at-article__p'>
            9.3 在租期结束时，按甲方要求主动归还租赁商品。
          </View>
          <View className='at-article__p'>
            9.4 不得买卖、抵押、质押、转租设备，不得擅自变动、修理、拆卸、更改租赁商品硬件任何部件。
          </View>
          <View className='at-article__p'>
            9.5 承担因使用不当造成租赁设备修理的费用，承担因不当使用租赁设备或其他故意或者过失造成的任何损失。
          </View>
          <View className='at-article__h3'>第十条 关于信息保护</View>
          <View className='at-article__p'>
            10.1 退租时，为保障乙方的隐私及信息安全，乙方需配合甲方妥善处理保存在商品的数据信息，对于退还的设备，甲方将抹除所有数据，将其还原商品出租前的初始状态，无义务保留商品中的相关信息。
          </View>
          <View className='at-article__h3'>第十一条 失信客户的处理</View>
          <View className='at-article__p'>
            11.1 以下情况之一的，乙方将被认定为失信客户：
          </View>
          <View className='at-article__p'>
            （1）逾期1个月不支付商品租金的或逾期后不缴纳逾期租金的。
          </View>
          <View className='at-article__p'>
            （2）租赁期满，但拒不归还的。
          </View>
          <View className='at-article__p'>
            （3）归还的商品严重损坏，但拒不偿付维修费用的。
          </View>
          <View className='at-article__p'>
            11.2对于被列入失信客户名单的乙方，平台及甲方将有权利采取包括但不限于以下的措施：
          </View>
          <View className='at-article__p'>
            （1）将失信乙方公司信息及相应负责人个人信息在刺猬优租机网站公布。
          </View>
          <View className='at-article__p'>
            （2）有权将违约信息反馈给依法设立的征信机构（包括但不限于芝麻信用管理有限公司），乙方了解上述违约信息可能影响乙方在征信机构处的信用状况，并可能影响其申请或办理相关服务。
          </View>
          <View className='at-article__p'>
            （3）向公安机关报案。
          </View>
          <View className='at-article__p'>
            （4）向法院起诉。
          </View>
          <View className='at-article__h3'>第十二条、隐私政策</View>
          <View className='at-article__p'>
            12.1本协议所指的“隐私”包括《电信和互联网用户个人信息保护规定》第4条规定的用户个人信息的内容以及未来不时制定或修订的法律法规中明确规定的隐私应包括的内容。
          </View>
          <View className='at-article__p'>
            12.2当乙方注册刺猬优租机以及在使用平台租赁服务时，乙方须向提供个人信息。刺猬优租机收集个人信息的目的是为乙方提供尽可能多的个人服务以及风险评估，从而为乙方提供免押租赁服务，在此过程中，平台不会泄露个人信息。
          </View>
          <View className='at-article__p'>
            12.3刺猬优租机不会在未经合法用户授权时，公开、编辑或透露其个人信息及保存在刺猬优租机中的非公开内容，除非有下列情况：
          </View>
          <View className='at-article__p'>
            （1）事先获得用户的明确授权；
          </View>
          <View className='at-article__p'>
            （2）根据有关的法律法规要求；
          </View>
          <View className='at-article__p'>
            （3）按照相关政府主管部门的要求；
          </View>
          <View className='at-article__p'>
            （4）为维护社会公众的利益；
          </View>
          <View className='at-article__p'>
            （5）用户已成为严重失信用户；
          </View>
          <View className='at-article__p'>
            12.4为提升服务的质量，刺猬优租机可能会与第三方合作共同向用户提供相关服务，此类合作可能需要包括但不限于用户数据与第三方用户数据的互通。在此情况下，乙方知晓并同意如该第三方同意承担与刺猬优租机同等的保护用户隐私的责任，则刺猬优租机有权将乙方的注册资料等提供给该第三方，并与第三方约定用户数据仅为双方合作之目的使用；并且刺猬优租机将对该等第三方使用乙方数据的行为进行监督和管理，尽一切合理努力保护乙方个人信息的安全性。
          </View>
          <View className='at-article__p'>
            12.5刺猬优租机可以向乙方注册的电子邮箱、手机号码发送服务所必须的商业信息。
          </View>
          <View className='at-article__h3'>第十三条 协议终止</View>
          <View className='at-article__p'>
            13.1 租赁期满，乙方归还设备，经商家检测并结清所有费用后，该协议终止。
          </View>
          <View className='at-article__p'>
            13.2 如乙方下单后商品交付前取消订单，经甲方与乙方协商一致，该协议终止。
          </View>
          <View className='at-article__p'>
            13.3 在租赁期内，乙方主动要求终止协议，并与甲方达成一致，该协议终止。
          </View>
          <View className='at-article__h3'>第十四条 争议处理</View>
          <View className='at-article__p'>
            14.1 因本协议履行过程中引起的或与本协议相关的任何争议，双方应以友好协商的方式解决，若经协商仍未解决，双方均可向甲方所在地人民法院提起诉讼，平台或甲方为实现债权所产生案件受理费、诉讼保全费、公告费、律师费（最低按2000元 / 件计算）、差旅行费等一切费用由违约方承担。
          </View>
          <View className='at-article__h3'>第十五条</View>
          <View className='at-article__p'>
            下单页面、甲方发货单等均是本协议附件，与本协议有同等法律效力。
          </View>
          <View className='at-article__h3'>第十六条</View>
          <View className='at-article__p'>
            本协议有效期自乙方下单并依约支付租金日起至甲方收回商品检测合格且乙方结清所有租金等费用之日止。
          </View>
        </View>
      </View>
    )
  }
}

export default Serviceprotocol;
