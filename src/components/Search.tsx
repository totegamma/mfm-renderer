import { Box } from "@mui/material";

export interface SearchProps {
    query: string;
}

export const Search = (props: SearchProps) => {

    return <Box
        sx={{
            display: "flex",
            margin: "8px 0"
        }}
    >
        <Box
            sx={{
                flexShrink: "1",
                padding: "10px",
                width: "100%",
                height: "40px",
                fontSize: "16px",
                border: "solid 1px #ddd",
                borderRadius: "4px 0 0 4px"
            }}
        >
            {props.query}
        </Box>
        <Box
            component="button"
            onClick={() => {
                const sp = new URLSearchParams()
                sp.append("q", props.query);
                window.open(`https://www.google.com/search?${sp.toString()}`, "_blank", "noopener");
            }}
            sx={{
                flexShrink: 0,
                margin: 0,
                padding: "0 16px",
                border: "solid 1px #ddd",
                borderLeft: "none",
                borderRadius: "0 4px 4px 0",
                "&:active": {
                    boxShadow: "0 2px 4px rgba(#000, 0.15) inset",
                }
            }}
        >
            検索
        </Box>
    </Box>
}

