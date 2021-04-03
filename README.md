整體架構:

1.使用route，利用迴圈產生不同城市網址並傳入不同參數到Main component

2.Main component 中包含了API 因為request種類少，因此不單獨分出一個檔案
Main 中有4個States
{
    spots : 放從Api 抓下來的資料
    skip  : 為了實現每看完30筆再看30的要求，紀錄目前的資料位置，方便發送request
    hasMore: 確保該城市的景點資料都抓完後，不要再發出request
    loading: 確保在頁尾處觸發CallBack function 時，重複發出request
}

City 則是由route 下傳的prop ， 由 useEffect 使得 City 一改變就重置skip並獲取新的spots


3.DropDown 則是拿來選擇不同城市的component 由父component下傳選項
利用按鈕 onClick 改變 state 進而選擇是否render選項框

4.Spot是用來放spot資料的component


