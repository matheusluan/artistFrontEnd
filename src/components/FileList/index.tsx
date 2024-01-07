import { Text } from "../Text";

type FileListProps = {
    files: File[];
};

const FileList: React.FC<FileListProps> = ({ files }) => (
    <div  style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {files.map((file, index) => (
            <div
                style={{

                    display: 'flex', borderRadius: '2px',
                    font: 'nunito', background: '#e5e5e5',

                    width: '30px', height: '30px',
                    margin: '10px', alignItems: 'center', justifyContent: 'center'
                }}
                key={index}
                title={file.name}> <Text fontSize="10px">{index + 1}</Text></div>
        ))}
    </div>
);

export default FileList;
