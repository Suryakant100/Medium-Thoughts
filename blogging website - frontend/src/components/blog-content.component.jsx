

const Img = ({src, caption}) => {
    return (
        <div>
            {}
            <img src={src} alt="" />
            {caption.length ? <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey ">{caption}</p>: ""}
        </div>
    )

}

const Quote = ({quote, caption}) => {

    return (
        <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
            <p className="text-xl leading-10 md:text-2xl ">
                {quote}
                {caption.length ? <p className="w-full text-base text-purple"></p>: ""}
            </p>
        </div>
    )
}

const Code = ({code}) => {
    return (
        <div className="bg-dark-grey/10 p-3 pl-5 border-l-4 border-dark-grey">
            <p className="prose prose-sm md:prose lg:prose-lg text-xl leading-10 md:text-2xl ">
                {code}
            </p>
        </div>
    )
}

const List = ({style, items}) => {
    return (
        <ol className={`pl-5 ${style == "ordered"? " list-decimal": " list-disc" }`}>
            {
                items.map((item, i) => {
                    return (
                        <li key={i} className="my-4">{item}
                        </li>
                    )
                })
            }
        </ol>
    )
}
const BlogContent = ({block}) => {

    let {type, data} = block
    if (type == 'paragraph') {
        return <p dangerouslySetInnerHTML={{__html: data.text}}></p>
    }
    if (type == "header") {
        if(data.level == 3) {
            return <h3 className="text-xl font-bold" dangerouslySetInnerHTML={{__html: data.text}}></h3>
        }
        return <h2 className="text-4xl fonr-bold" dangerouslySetInnerHTML={{__html:data.text}}></h2>
    }

    if (type == "image") {
        return <Img src={data.file.url} caption={data.caption} />
    }

    if (type == "quote") {
        return <Quote quote={data.text} caption={data.caption} ></Quote>
    }
    if (type == "code") {
        return <Code code={data.code}></Code>
    }

    if (type == "list") {
        return <List style={data.style} items= {data.items}></List>
    }

    



  return <h1>{block.data.text}</h1>;
};

export default BlogContent;
