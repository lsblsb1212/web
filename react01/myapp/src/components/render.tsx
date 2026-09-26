
import './render.css'

export default function Renderbox({ reply }: { reply: string | null }){
const content=reply ? JSON.parse(reply) : []
const sight=content?.find(item => item.type === "sight")
const food=content?.find(item => item.type === "food")
const hotel=content?.find(item => item.type === "hotel")
const sightarry=sight?.items ?? []

console.log(sight?.items[0].name?sight.items[0].name:null);


return <div className="box">
<div className={sight?.type}>
    <h2 className={sight?.title}>{sight?.title}</h2>
    {sight?.items.map((item)=>(
    <div>
     <h3 className={item.name}> {item?.name}</h3>
     <div className="item_content">开放时间：{item.open_time}<br/>地址：{item.address}<br/>简介：{item.desc}<br/>{item.reason}<br/>交通：{item.traffic}<br/>价格：{item.price}</div>
    </div>
    ))}
    {sight?.type &&(<hr style={{border: 'none',borderTop: '1px dashed #999',margin:'5px auto'}} />)}
</div>
<div className={food?.type}>
    <h2 className={food?.title}>{food?.title}</h2>
    {food?.items.map((item)=>(
    <div>
     <h3 className={item.name}> {item?.name}</h3>
     <div className="item_content">{item.desc}</div>
    </div>
    ))}
    {food?.type &&(<hr style={{border: 'none',borderTop: '1px dashed #999',margin:'5px auto'}} />)}
</div>
<div className={hotel?.type}>
    <h2 className={hotel?.title}>{hotel?.title}</h2>
    {hotel?.items.map((item)=>(
    <div>
     <h3 className={item.name}> {item?.name}</h3>
     <div className="item_content">{item.desc}</div>
    </div>
    ))}
</div>

</div>
}