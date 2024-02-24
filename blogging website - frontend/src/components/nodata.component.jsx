const NoDataMessage = ({message}) => {
    return (
        <div className="w-full text-center mt-4 bg-grey p-4 rounded-full">
            <p className="text-xl font-medium">{message}</p>
        </div>
    )
}

export default NoDataMessage;