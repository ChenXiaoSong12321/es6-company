#!/usr/bin/perl
#==============================================================================#
#
# 描述: 添加规则列表规则页面
#
# 作者: 刘婷 (LiuTing), 914855723@qq.com
# 公司: capsheaf
# 历史:
#   2015.4.15 LiuTing创建
#   2015.5.9 modified by Julong Liu
#
#==============================================================================#
use Encode;
use Data::Dumper;

require '/var/efw/header.pl';
require 'list_panel_opt.pl';


#=================初始化全局变量到init_data()中去初始化========================#
my $extraheader;        #存放用户自定义CSS,JS
my %par;                #存放post方法传过来的数据的哈希
my %query;              #存放通过get方法传过来的数据的哈希
my $LOAD_ONE_PAGE = 0;  #是否只load一页的数据，0表示全部加载
my $json = new JSON::XS;#处理json数据的变量，一般不变

my $MSG;                #存放系统提示信息
my $STATUS_FLAG;


#=========================全部变量定义end=======================================#

&main();

sub main() {
    #获取post请求传过来的变量
    &getcgihash(\%par);
    #获取get请求传过来的变量
    &get_query_hash(\%query);
    #初始化变量值
    &init_data();
    &make_file();
    #做出响应
    &do_action();
}

sub init_data(){

    $errormessage       = '';
    $notemessage        = '';
    $cmd                         = "/usr/local/bin/getSerialMessage.py";

    #============要使用添加面板和翻页列表面板必须引用的CSS和JS-BEGIN============================#
    #============扩展的CSS和JS放在源CSS和JS后面就像这里的add_list_demo.js脚本===================#
    $extraheader = '<link rel="stylesheet" type="text/css" href="/include/add_list_base.css" />
                    <link rel="stylesheet" type="text/css" href="/include/netwizard_new.min.css" />
                    <link rel="stylesheet" type="text/css" href="/include/animate.css" />

                    <link rel="stylesheet" type="text/css" href="/include/waiting_mesgs.css"/>

                    <script language="JavaScript" src="/include/min/netwizard_new.min.js"></script>
                    <script language="JavaScript" src="/include/message_manager.js"></script>'

                    
    #============要使用添加面板和翻页列表面板必须引用的CSS和JS-END==============================#
}

sub do_action() {
    #==一般ACTION只会通过一种方式传过来，开发者需要自己判断从哪种方式传过来==#
    my $action = $par{'ACTION'};
    my $query_action = $query{'ACTION'};
    my $panel_name = $par{'panel_name'};

    if($action ne 'export_data' && $query_action ne 'export_data' && $query_action ne 'export_selected') {
        &showhttpheaders();
    }

    #===根据用户提交的数据进行具体反馈,默认返回页面==#
    if ( $action eq 'getStep' ) {
        &getStep();
    }elsif($action eq 'getData'){
        my %ret_data;
        print ('{
    "stepdetail": {
        "step1": {
            "text": "主上行接口(WAN)", 
            "stepText":"选择主上行接口类型",
            "type": "radio", 
            "name": "RED_TYPE", 
            "detail": [
                {
                    "value": "STATIC", 
                    "checked": false, 
                    "text": "固定IP"
                }, 
                {
                    "value": "DHCP", 
                    "checked": true, 
                    "text": "DHCP"
                }, 
                {
                    "value": "PPPOE", 
                    "checked": false, 
                    "text": "PPPOE"
                }, 
                {
                    "value": "NONE", 
                    "checked": false, 
                    "text": "透明网关"
                }
            ]
        }, 
        "step2": {
            "stepText":"选择需要启用的网络服务区域",
            "text": "服务器区(DMZ)", 
            "type": "radio", 
            "name": "ZONES", 
            "detail": [
                {
                    "value": "NONE", 
                    "checked": false, 
                    "text": "无"
                }, 
                {
                    "value": "ORANGE", 
                    "checked": true, 
                    "text": "DMZ区"
                }
            ]
        }, 
        "step3": {
            "stepText":"网络参数设置",
            "options": [
                {
                    "name": "", 
                    "text": "内网用户区(LAN)", 
                    "type": "group", 
                    "options": [
                        {
                            "text": "IP 地址*", 
                            "type": "text", 
                            "name": "DISPLAY_GREEN_ADDRESS", 
                            "value": "192.168.11.181"
                        }, 
                        {
                            "text": "附加IP地址", 
                            "type": "textarea", 
                            "name": "DISPLAY_GREEN_ADDITIONAL", 
                            "value": "192.168.11.181&3.3.3.3"
                        }, 
                        {
                            "text": "子网掩码*", 
                            "name": "DISPLAY_GREEN_NETMASK", 
                            "type": "select", 
                            "options": [
                                {
                                    "value": "0", 
                                    "text": "/0 - 0.0.0.0", 
                                    "checked": false
                                }, 
                                {
                                    "value": "1", 
                                    "text": "/1 - 128.0.0.0", 
                                    "checked": true
                                }
                            ]
                        }, 
                        {
                            "text": "接口*", 
                            "name": "", 
                            "type": "table", 
                            "options": [
                                {
                                    "name": "", 
                                    "type": "", 
                                    "checked": "", 
                                    "value": "", 
                                    "port": "端口", 
                                    "connect": "连接", 
                                    "mac": "MAC", 
                                    "device": "设备"
                                }, 
                                {
                                    "name": "GREEN_DEVICES", 
                                    "type": "checkbox", 
                                    "checked": true, 
                                    "value": "1", 
                                    "port": "n/a", 
                                    "connect": false, 
                                    "mac": "28:51:32:12:06:d3", 
                                    "device": "eth0.10"
                                }, 
                                {
                                    "name": "GREEN_DEVICES", 
                                    "type": "checkbox", 
                                    "checked": false, 
                                    "value": "2", 
                                    "port": "1", 
                                    "connect": true, 
                                    "mac": "28:51:32:12:06:d4", 
                                    "device": "eth1"
                                }
                            ]
                        }
                    ]
                }, {
                    "name": "", 
                    "text": "服务器区(DMZ)", 
                    "type": "dmzGroup", 
                    "options": [
                        {
                            "text": "IP 地址*", 
                            "type": "text", 
                            "name": "DISPLAY_ORANGE_ADDRESS", 
                            "value": "192.168.11.181"
                        }, 
                        {
                            "text": "附加IP地址", 
                            "type": "textarea", 
                            "name": "DISPLAY_GREEN_ADDITIONAL", 
                            "value": "192.168.11.181&3.3.3.3"
                        }, 
                        {
                            "text": "子网掩码*", 
                            "name": "DISPLAY_ORANGE_NETMASK", 
                            "type": "select", 
                            "options": [
                                {
                                    "value": "0", 
                                    "text": "/0 - 0.0.0.0", 
                                    "checked": false
                                }, 
                                {
                                    "value": "1", 
                                    "text": "/1 - 128.0.0.0", 
                                    "checked": true
                                }
                            ]
                        }, 
                        {
                            "text": "接口*", 
                            "name": "", 
                            "type": "table", 
                            "options": [
                                {
                                    "name": "", 
                                    "type": "", 
                                    "checked": "", 
                                    "value": "", 
                                    "port": "端口", 
                                    "connect": "连接", 
                                    "mac": "MAC", 
                                    "device": "设备"
                                }, 
                                {
                                    "name": "ORANGE_DEVICES", 
                                    "type": "checkbox", 
                                    "checked": true, 
                                    "value": "1", 
                                    "port": "n/a", 
                                    "connect": false, 
                                    "mac": "28:51:32:12:06:d3", 
                                    "device": "eth0.10"
                                }, 
                                {
                                    "name": "ORANGE_DEVICES", 
                                    "type": "checkbox", 
                                    "checked": false, 
                                    "value": "2", 
                                    "port": "1", 
                                    "connect": true, 
                                    "mac": "28:51:32:12:06:d4", 
                                    "device": "eth1"
                                }
                            ]
                        }
                    ]
                }, 
                {
                    "text": "主机名", 
                    "name": "HOSTNAME", 
                    "type": "text", 
                    "value": "localhost"
                }, 
                {
                    "text": "域名", 
                    "name": "DOMAINNAME", 
                    "type": "text", 
                    "value": "localdomain"
                }
            ]
        }, 
        "step4": {
            "stepText":"互联网连接偏好设置",
            "text": "主上行接口(WAN)[默认网关*]", 
            "name": "DEFAULT_GATEWAY", 
            "type": "text", 
            "value": "192.168.11.1"
        }, 
        "step5": {
            "stepText":"配置DNS",
            "options": [
                {
                    "text": "DNS 1*", 
                    "name": "DNS1", 
                    "type": "text", 
                    "value": "61.139.2.69"
                }, 
                {
                    "text": "DNS 2", 
                    "name": "DNS2", 
                    "type": "text", 
                    "value": ""
                }
            ]
        }, 
        "step6": {
            "stepText":"配置默认管理员邮箱",
            "options": [
                {
                    "text": "管理员邮箱地址", 
                    "name": "MAIN_ADMINMAIL", 
                    "type": "text", 
                    "value": ""
                }, 
                {
                    "text": "发送者邮件地址", 
                    "name": "MAIN_MAILFROM", 
                    "type": "text", 
                    "value": ""
                }, 
                {
                    "text": "邮件中继主机地址", 
                    "name": "MAIN_SMARTHOST", 
                    "type": "text", 
                    "value": ""
                }
            ]
        }, 
        "step7": {
            "stepText":"应用配置",
            "text": "网络设置已经准备好,点击应用配置就可应用新的配置.."
        }, 
        "step8": {
            "stepText":"配置完成",
            "text": "配置成功"
        }
    }
}
}'); 
    }    
    else{
        &show_page();
    }
}
sub getStep(){
    my %ret_data;
    my @content_array = ('选择主上行接口类型',
                        '选择需要启用的网络服务区域',
                        '网络参数设置',
                        '互联网连接偏好设置',
                        '配置DNS',
                        '配置默认管理员邮箱',
                        '应用配置',
                        '配置完成');

    %ret_data->{'step'} = \@content_array;

    my $ret = $json->encode(\%ret_data);
    print $ret; 
}
sub show_page() {
    &openpage($page_config{'网络配置向导'}, 1, $extraheader);
    # &openbigbox($errormessage, $warnmessage, $notemessage);
    &display_main_body();
    &show_message();
    &closepage();
}

sub display_main_body() {
    printf<<EOF

    <div id="mesg_box" class="container"></div>
    <input type="hidden" id="log-mesg-error" value="$errormesg">
    <input type="hidden" id="log-mesg-note" value="$notemessage">  
    <div id="main_nwz">
        <div id="step">
            
        </div>
        <div id="step_panel">

            <br/>
            <br/>
            
        </div> 
    </div>
        <div id="footer_btn">
           
        </div>
EOF
    ;
}

sub make_file(){
    if(! -e $conf_dir){
        system("mkdir -p $conf_dir");
    }
    
    if(! -e $conf_file){
        system("touch $conf_file");
    }
}
