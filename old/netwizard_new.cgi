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
        print ('aa'); 
    }    
    else{
        &show_page();
    }
}

sub show_page() {
    &openpage($page_config{'网络配置向导'}, 1, $extraheader);
    # &openbigbox($errormessage, $warnmessage, $notemessage);
    &display_main_body();
    &closepage();
}

sub display_main_body() {
    printf<<EOF

    <div id="mesg_box" class="container"></div>
    <input type="hidden" id="log-mesg-error" value="$errormesg">
    <input type="hidden" id="log-mesg-note" value="$notemessage">  
    <div id="main_nwz">
        <div id="step"></div>
        <div id="step_panel"></div> 
    </div>
    <div id="footer_btn"></div>
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
