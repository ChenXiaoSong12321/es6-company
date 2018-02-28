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

                    <script language="JavaScript" src="/include/netwizard_new.js"></script>
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
    }elsif($action eq 'aaa'){
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
            <div  class="stepBar" >
                <ul>
                    <li>
                        <div class="step-line success">
                            <span class="line"></span>
                        </div>
                        <div class="step-num success">
                            <div class="bg-circle">
                               <span class="num">1</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num current">
                            <div class="bg-circle">
                               <span class="num">2</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num">
                            <div class="bg-circle">
                               <span class="num">3</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num">
                            <div class="bg-circle">
                           <span class="num">4</span>
                        </div>
                        </div>
                    </li>
                    <li>
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num">
                            <div class="bg-circle">
                           <span class="num">5</span>
                        </div>
                        </div>
                    </li>
                    <li>
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num">
                            <div class="bg-circle">
                           <span class="num">6</span>
                        </div>
                        </div>
                    </li>
                    <li>
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num">
                            <div class="bg-circle">
                           <span class="num">7</span>
                        </div>
                        </div>
                    </li>
                    <li class="last-step">
                        <div class="step-line">
                            <span class="line"></span>
                        </div>
                        <div class="step-num">
                            <div class="bg-circle">
                           <span class="num">8</span>
                        </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="step_panel">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           
            step_panel
        </div> 
    </div>
        <div id="footer_btn">
            <button class="prev">
                <span class="btn-name">上一步</span>
                <span class="control-detail">选择主上行接口类型</span>
            </button>
            <button class="next">
                <span class="btn-name">下一步</span>
                <span class="control-detail">网络参数设置</span>
            </button>
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
