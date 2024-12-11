const axios = require('axios');

async function fetchFoundData(url) {
    try {
        const response = await axios.get(url);
        const dataText = response.data;

        // Use a function to extract variables from the script
        const extractVariables = (script) => {
            let fS_nameMatch = script.match(/var\s*fS_name\s*=\s*"(.*?)";/);//基金名
            let fS_codeMatch = script.match(/var\s*fS_code\s*=\s*"(.*?)";/);//基金代码
            let Data_WorthTrendMatch = script.match(/var\s*Data_ACWorthTrend\s*=\s*(\[.*?\]);/s);//基金累计净值数组
            let rateInSimilarPersentMatch = script.match(/var\s*Data_rateInSimilarPersent\s*=\s*(\[.*?\]);/s);//同类排名百分比
            let syl_1nMatch = script.match(/var\s*syl_1n\s*=\s*"(.*?)";/);//近1年收益
            let syl_6yMatch = script.match(/var\s*syl_6y\s*=\s*"(.*?)";/);//近半年收益
            let syl_3yMatch = script.match(/var\s*syl_3y\s*=\s*"(.*?)";/);//近3个月收益
            let syl_1yMatch = script.match(/var\s*syl_1y\s*=\s*"(.*?)";/);//近1个月收益率

            let fS_name = fS_nameMatch ? fS_nameMatch[1] : "-";
            let fS_code = fS_codeMatch ? fS_codeMatch[1] : "-";
            let syl_1n = syl_1nMatch ? parseFloat(syl_1nMatch[1]) : "-";
            let syl_6y = syl_6yMatch ? parseFloat(syl_6yMatch[1]) : "-";
            let syl_3y = syl_3yMatch ? parseFloat(syl_3yMatch[1]) : "-";
            let syl_1y = syl_1yMatch ? parseFloat(syl_1yMatch[1]) : "-";

            let Data_WorthTrend = Data_WorthTrendMatch ? JSON.parse(Data_WorthTrendMatch[1]) : [];
            let Data_ACWorthTrend = rateInSimilarPersentMatch ? JSON.parse(rateInSimilarPersentMatch[1]) : [];

            return { fS_name, fS_code, Data_WorthTrend, Data_ACWorthTrend, syl_1n, syl_6y, syl_3y, syl_1y };
        };

        let { fS_name, fS_code, Data_WorthTrend, Data_ACWorthTrend, syl_1n, syl_6y, syl_3y, syl_1y } = extractVariables(dataText);

        let syl_total = "-";
        if (Data_WorthTrend && Data_WorthTrend.length > 0) {

            //计算成立以来净值
            const firstDayValue = Data_WorthTrend[0][1];
            const lastDayValue = Data_WorthTrend[Data_WorthTrend.length - 1][1];
            syl_total = ((lastDayValue - firstDayValue) / firstDayValue) * 100;
        } else {
            console.error('基金累计净值数据Data_acWorthTrend不可用或为空');
        }
        //当前同类排名百分比
        let rank_total = "-";
        if (Data_ACWorthTrend && Data_ACWorthTrend.length > 0) {
            //获取百分比
            rank_total = Data_ACWorthTrend[Data_ACWorthTrend.length - 1][1];
        } else {
            console.error('基金百分比排名数据Data_ACWorthTrend不可用或为空');
        }

        console.log(`基金名称: ${fS_name}`);
        console.log(`基金代码: ${fS_code}`);
        console.log(`成立以来收益: ${syl_total}%`);
        console.log(`近1年收益: ${syl_1n}%`);
        console.log(`近6月收益: ${syl_6y}%`);
        console.log(`近3月收益: ${syl_3y}%`);
        console.log(`近1月收益: ${syl_1y}%`);
        console.log(`百分比排名: ${rank_total}%`);

    } catch (error) {
        console.error('解析基金数据时出错:', error);
    }
}

// Example usage
const url = 'http://fund.eastmoney.com/pingzhongdata/012967.js'; // Replace with the actual URL
fetchFoundData(url);