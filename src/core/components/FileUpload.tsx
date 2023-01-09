import { AiOutlineFile, BsCardImage, BsCloudArrowUp, BsFillTrash2Fill } from "react-icons/all";
import { humanFileSize } from "~/core/helpers/string";
import { getMimeTypes } from "~/core/helpers/mime";

export const Preview = ({file, id, isImage, onDelete}) => {
	const title = file.name
	const objectURL = id
	const size = humanFileSize(file.size);
	const deleteItem = () => {
		console.log("Delete...", objectURL)
		if (onDelete) {
			onDelete(objectURL)
		}
	}
	return (
		<li id={objectURL} className="block p-1 min-w-1/5 h-24">
			<article
				className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
				{isImage && <img alt={file.name} src={objectURL} className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" />}
				<section
					className={`${!isImage ? 'text-black': ''} flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3 group-hover:bg-primary-dark group-hover:opacity-50 group-hover:text-white`}>
					<h1 className="flex-1">{title}</h1>
					<div className="flex">
						  <span className="p-1">
							  {isImage && <BsCardImage  className="fill-current w-4 h-4 ml-auto"/>}
							  {!isImage && <AiOutlineFile  className="fill-current w-4 h-4 ml-auto"/>}
						  </span>
						
						<p className="p-1 size text-xs">{size}</p>
						<button onClick={deleteItem} className="delete ml-auto focus:outline-none hover:bg-gray-300 hover:text-black p-1 rounded-md">
							<BsFillTrash2Fill className="pointer-events-none w-4 h-4 ml-auto"/>
						</button>
					</div>
				</section>
			</article>
		</li>
	);
};

export const FileUpload = ({multiple = false, onFileChanged = null, onUpload = null, hideClearButton = false, allowedExtension = []}) => {
	const [files, setFiles] = useState([])
	const [error, setError] = useState('')
	const fileInput = useRef(null)
	const [acceptedMimes, setAcceptedMimes] = useState(getMimeTypes(allowedExtension))
	function addFile(file) {
		if (multiple) {
			setFiles([
				// @ts-ignore
				...files,
				// @ts-ignore
				{
					file: file,
					id: URL.createObjectURL(file),
					isImage: file.type.match("image.*"),
				}
			])
		} else {
			// @ts-ignore
			setFiles([{
				file: file,
				id: URL.createObjectURL(file),
				isImage: file.type.match("image.*"),
			}])
		}
	}
	// @ts-ignore
	const fileUpload = () => fileInput.current.click();
	const hiddenChanged = (e) => {
		let fileChanged = false
		for (const file of e.target.files) {
			if(acceptedMimes.includes(file.type)) {
				addFile( file);
				fileChanged = true
			} else {
				setError(true)
				setTimeout(function() {
					setError(false)
				}, 1000)
			}
		}
		if (fileChanged && onFileChanged) {
			onFileChanged(files)
		}
	};
	const deleteFile = (id) => {
		setFiles(files.filter(f => f.id !== id))
		if (onFileChanged) {
			onFileChanged(files)
		}
	};
	const submit = () => {
		if (onUpload) {
			onUpload(files)
		}
	};
	const cancel = () => {
		setFiles([])
	}
	// handle drag events
	const handleDrag = function(e) {
		e.preventDefault();
		e.stopPropagation();
		
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let fileChanged = false
		for (const file of e.dataTransfer.files) {
			if(acceptedMimes.includes(file.type)) {
				addFile( file);
				fileChanged = true
			} else {
				setError(true)
				setTimeout(function() {
					setError(false)
				}, 1000)
			}
		}
		if (fileChanged && onFileChanged) {
			onFileChanged(files)
		}
	};
	useEffect(() => {
		setAcceptedMimes(getMimeTypes(allowedExtension))
	}, [allowedExtension])
	return (
		<main className="container h-full">
			<article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
				<section className="h-full p-4 w-full flex flex-col">
					{multiple && (
						<header
							className="border-dashed border-2 border-gray-400 w-full pt-5 pb-6 left-0 flex flex-col items-center rounded-md">
							<BsCloudArrowUp className="fill-current w-12 h-12 mb-1 text-primary"/>
							<p className="text text-primary">Drop files to upload or</p>
							{multiple && <input onChange={hiddenChanged} type="file" multiple className="hidden"
												accept={acceptedMimes.join(",")}
                                                ref={fileInput} />}
							{!multiple && <input onChange={hiddenChanged} type="file" accept={acceptedMimes.join(",")} className="hidden"
                                                 ref={fileInput} />}
							<button onClick={fileUpload}
									className="text-sm mt-5 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
								Choose a file
							</button>
						</header>
					)}
					{files.length === 0 && !multiple && (
						<header
							className="border-dashed border-2 border-gray-400 w-full pt-5 pb-6 left-0 flex flex-col items-center rounded-md">
							<BsCloudArrowUp className="fill-current w-12 h-12 mb-1 text-primary"/>
							<p className="text-primary">Drop files to upload or</p>
							{multiple && <input onChange={hiddenChanged} accept={acceptedMimes.join(",")} type="file" multiple className="hidden"
                                                ref={fileInput} />}
							{!multiple && <input onChange={hiddenChanged} accept={acceptedMimes.join(",")} type="file" className="hidden"
                                                 ref={fileInput} />}
							<button onClick={fileUpload}
									className="text-sm mt-5 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
								Choose a file
							</button>
						</header>
					)}
					
					{ error && (
						<h1 className="py-4 font-semibold sm:text-sm text-red-900">
							Invalid file
						</h1>
					)}
					{multiple && files.length > 0 && (
						<h1 className="py-4 font-semibold sm:text-lg text-gray-900">
							Files to upload
						</h1>
					)}
					
					<ul className={`flex flex-1 -m-1 ${multiple?'': 'w-1/5'}`}>
						{files.map((file, i) => <Preview file={file.file} id={file.id} key={i} onDelete={deleteFile} isImage={file.isImage}/>)}
					</ul>
				</section>
				
				<footer className="flex justify-end p-4">
					{onUpload && (
						<button onClick={submit}
								className="text-sm rounded-sm px-3 py-1 bg-primary hover:bg-primary-dark text-white focus:shadow-outline focus:outline-none">
							Upload now
						</button>
					)}
					{!hideClearButton && (
						<button onClick={cancel}
								className="text-sm border ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
							Clear
						</button>
					)}
				</footer>
			</article>
		</main>
	);
};