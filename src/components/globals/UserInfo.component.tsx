import { IGithubUserInfo } from "@/types/global";
import { useEffect, useState } from "react";
import { getGithubUserInfoMemo } from '@/httpApi/httpApi';
import { Avatar, Grid, Typography, Box, Paper } from "@mui/material";

const getGithubUserInfoByName = getGithubUserInfoMemo();

export function ItemLabel({ k, v, className }: { k: string, v: string, className?: string }) {
    return <Typography className={className}>{k ? <span><b>{k}</b>: </span> : ''}{v}</Typography>;
}

export default function UserInfo({ githubUser }: { githubUser: string }) {
    const [userInfo, setUserInfo] = useState<IGithubUserInfo | null>(null);
    useEffect(() => {
        async function getUserInfo() {
            const info = await getGithubUserInfoByName(githubUser);
            setUserInfo(info);
        }
        getUserInfo();
    }, [githubUser]);

    const userLabels: string[] = [
        'login',
        'name',
        'company',
        'blog',
        'location',
        'bio',
        'twitter_username',
        'public_repos',
        'public_gists',
        'followers',
        'following'
    ]

    type UserInfoKey = keyof typeof userInfo;

    return (
        userInfo ? (
            <Grid container>
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Paper sx={{padding: '10px', borderRadius: '4px'}} elevation={13}>
                            <Avatar
                                sx={{ width: '100px', height: '100px' }}
                                src={userInfo.avatar_url}
                                variant="square">
                            </Avatar>
                        </Paper>
                    </Box>
                    <Grid container>
                        <Grid item>
                            {
                                userLabels.map((lbl: string, idx: number) => {
                                    const data: string = userInfo[lbl as UserInfoKey];
                                    return data ? (
                                        <ItemLabel
                                            key={`${idx}-${userInfo.id}`}
                                            k={lbl.split('_').join(' ')}
                                            v={data}
                                            className={'capitalize-text'}
                                        />
                                    ) : false;
                                }).filter(Boolean)
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ) : (
            <Grid container>
                <Grid item>
                    Loading info...
                </Grid>
            </Grid>
        )
    );
}